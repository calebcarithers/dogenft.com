import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

// https://github.com/mydoge-com/mydogemask-next-example

interface RequestTransactionParams {
  recipientAddress: string;
  dogeAmount: number;
}

interface GetTransactionStatusReturn {
  address: string;
  blockTime: number;
  confirmations: number;
  dogeAmount: string;
  status: "pending" | "confirmed";
  txId: string;
}

interface MyDoge {
  connect: (
    onConnect?: (data: any) => void,
    onError?: (err: any) => void
  ) => Promise<any>;
  getBalance: () => Promise<any>;
  requestTransaction: (params: RequestTransactionParams) => Promise<any>;
  disconnect: () => Promise<any>;
  getTransactionStatus: ({
    txId,
  }: {
    txId: string;
  }) => Promise<GetTransactionStatusReturn>;
}

interface MyDogeContext {
  myDoge: MyDoge | null;
  account: string | null;
  balance: string | null;
  isConnected: boolean;
  setAccount: (account: string | null) => void;
  setBalance: (balance: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const MyDogeContext = createContext<MyDogeContext>({
  myDoge: null,
  account: null,
  balance: null,
  isConnected: false,
  setAccount: () => {},
  setBalance: () => {},
  setIsConnected: () => {},
});

export const MyDogeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [myDoge, setMyDoge] = useState(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "doge#initialized",
      () => {
        setMyDoge((window as any).doge);
      },
      { once: true }
    );
  }, []);
  return (
    <MyDogeContext.Provider
      value={{
        myDoge,
        account,
        balance,
        isConnected,
        setAccount,
        setBalance,
        setIsConnected,
      }}
    >
      {children}
    </MyDogeContext.Provider>
  );
};

interface ConnectedData {
  address: string;
  approved: boolean;
  balance: string;
}

export const useConnect = () => {
  const { myDoge, setAccount, setBalance, isConnected, setIsConnected } =
    useContext(MyDogeContext);

  const [isConnecting, setIsConnecting] = useState(false);

  if (!myDoge) {
    return {
      connect: () => console.log(),
      isConnected,
      isConnecting,
    };
  } else {
    return {
      isConnected,
      isConnecting,
      connect: () => {
        setIsConnecting(true);
        return myDoge
          .connect()
          .then((res: ConnectedData) => {
            setIsConnected(true);
            setAccount(res.address);
            setBalance(res.balance);
          })
          .catch((e) => setIsConnected(false))
          .then(() => setIsConnecting(false));
      },
    };
  }
};

export const useAccount = () => {
  const { account, balance } = useContext(MyDogeContext);
  return { account, balance };
};

export const useDisconnect = () => {
  const { myDoge, setIsConnected, setAccount, setBalance } =
    useContext(MyDogeContext);
  return {
    disconnect: () =>
      myDoge
        ?.disconnect()
        .then((res) => {
          setIsConnected(false);
          setAccount(null);
          setBalance(null);
        })
        .catch((e) => console.error(e)),
  };
};

export const useTx = (params: RequestTransactionParams) => {
  const { myDoge } = useContext(MyDogeContext);
  const [isError, setIsError] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  return {
    sendTx: () => {
      setIsLoading(true);
      return myDoge
        ?.requestTransaction(params)
        .then((res) => setTxId(res.txId))
        .catch((e) => setIsError(true))
        .finally(() => setIsLoading(false));
    },
    txId,
    isLoading,
  };
};

export const useIsMyDogeInstalled = () => {
  const { myDoge } = useContext(MyDogeContext);
  return !!myDoge;
};

export const useWaitForTransaction = (txId?: string | null) => {
  const { myDoge } = useContext(MyDogeContext);
  const [tx, setTx] = useState<null | GetTransactionStatusReturn>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (txId && myDoge) {
      setIsLoading(true);
      const interval = setInterval(async () => {
        const tx = await myDoge.getTransactionStatus({ txId });
        if (tx.status === "confirmed") {
          setTx(tx);
          setIsLoading(false);
          clearInterval(interval);
        }
        console.log("debug:: res", tx);
      }, 10_000);
    }
  }, [txId, myDoge]);
  return { isLoading, tx };
};

// Poll to get the transaction status
// setInterval(async () => {
//   const txStatusRes = await myDogeMask.getTransactionStatus({
//     txId: txReqRes.txId,
//   });
//   console.log("transaction status result", txStatusRes);
//   /*{
//       "txId": "b9fc04f226b194684fe24c786be89cae26abf8fcebbf90ff7049d5bc7fa003f0",
//       "confirmations": 0,
//       "dogeAmount": "420000000",
//       "blockTime": 1675217503,
//       "status": "pending"
//     }*/
// }, 10000);
