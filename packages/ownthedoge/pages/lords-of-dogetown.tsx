import { PivotControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import Button from "dsl/components/Button/Button";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import Link from "dsl/components/Link/Link";
import { BigNumber } from "ethers";
import Image from "next/image";
import {
  PropsWithChildren,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getDogetownWhitelist } from "../environment";
import { vars } from "../environment/vars";
import { css } from "../helpers/css";
import erc1155abi from "../services/abis/erc1155";
import sandboxAbi from "../services/abis/sandbox";
import { getProof } from "../services/merkletree";
import { targetChain } from "../services/wagmi";

interface Model {
  url: string;
  name: string;
  description: string;
  scale: number;
  position: Vector3;
  tokenId: string;
}

const models: Model[] = [
  {
    url: "/models/doge-mech.gltf",
    name: "Mech",
    description: "Mecha Doge",
    scale: 0.05,
    position: [0, -1.2, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980232",
  },
  {
    url: "/models/doge-backpack.gltf",
    name: "Doge Backpack",
    description: "Much backpack mini Doge!",
    scale: 0.08,
    position: [0, -2.7, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980231",
  },
  {
    url: "/models/doge-drives.gltf",
    name: "Doge Drives",
    description: "Much zoom Doge",
    scale: 0.03,
    position: [0, -0.7, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980230",
  },
  {
    url: "/models/doge-head-hat.gltf",
    name: "Doge Head Hat",
    description: "Many handsome Doge!",
    scale: 0.09,
    position: [0, -5, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980227",
  },
  {
    url: "/models/doge-paw-slippers.gltf",
    name: "Doge Paw Slippers",
    description: "Much comfy! Such Doge!",
    scale: 0.1,
    position: [0, 0, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980229",
  },
  {
    url: "/models/doge-rest.gltf",
    name: "Doge Rest",
    description: "Much sleep",
    scale: 0.02,
    position: [0, -1, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980226",
  },
  {
    url: "/models/doge-statue.gltf",
    name: "Doge Statue",
    description: "Dogely statue for wows",
    scale: 0.028,
    position: [0, -1.9, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980224",
  },
  {
    url: "/models/doge-tail.gltf",
    name: "Doge Tail",
    description: "Such Doge!",
    scale: 0.1,
    position: [0, -2, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980225",
  },
  {
    url: "/models/doge-paw-gloves.gltf",
    name: "Doge Paw Gloves",
    description: "Much paw! Such Doge!",
    scale: 0.1,
    position: [0, -2, 0],
    tokenId:
      "67031862187656528318453779715773770542811847030081758913959388841425388980228",
  },
];

enum RotationSpeeds {
  Default = 0.01,
  Claiming = 0.2,
  Static = 0,
}

const whitelist = getDogetownWhitelist();

const BorderedText: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={css(
        "text-xl",
        "bg-pixels-yellow-100",
        "p-3",
        "border-2",
        "border-dashed",
        "border-pixels-yellow-300",
        "font-bold",
        className
      )}
    >
      {children}
    </div>
  );
};

const LordsOfDogetown = () => {
  const [isInWhitelist, setIsInWhitelist] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(RotationSpeeds.Default);
  const [_interval, _setInterval] = useState<NodeJS.Timer | null>(null);
  const [claimedTokenId, setClaimedTokenId] = useState<string | null>(null);
  const model = useMemo(() => models[modelIndex], [modelIndex]);

  const { chain } = useNetwork();
  const { address } = useAccount();

  const MS_TO_ALERNATE_CLAIM = 500;

  const proof = useMemo(
    () =>
      getProof(
        address ? address : "0xd801d86C10e2185a8FCBccFB7D7baF0A6C5B6BD5",
        whitelist as string[]
      ),
    [address]
  );

  const sandBoxContractAddress =
    vars.NEXT_PUBLIC_SANDBOX_CLAIM_CONTRACT_ADDRESS;

  const {
    data: whitelistClaimed,
    isLoading: whitelistClaimedLoading,
    refetch: refetchWhiteListClaimed,
  } = useContractRead({
    address: sandBoxContractAddress,
    abi: sandboxAbi,
    functionName: "whitelistClaimed",
    args: [address ? address : ""],
  });

  const { config } = usePrepareContractWrite({
    address: sandBoxContractAddress,
    abi: sandboxAbi,
    functionName: "claim",
    args: [proof] as unknown[],
    staleTime: 1000,
    cacheTime: 1000,
  });

  const GAS_LIMIT_MULTIPLIER = 1.2;

  const {
    data: contractData,
    isLoading: isSignLoading,
    isSuccess,
    write,
    //@ts-ignore
  } = useContractWrite({
    ...config,
    //@ts-ignore
    request: {
      ...config.request,
      gasLimit: Math.ceil(
        config?.request?.gasLimit
          ? config?.request?.gasLimit.toNumber() * GAS_LIMIT_MULTIPLIER
          : 0
      ),
    },
  });

  const {
    isLoading: isTxLoading,
    isError: isTxErrored,
    data: txData,
  } = useWaitForTransaction({
    hash: contractData?.hash,
    onSuccess(data) {
      console.log("tx successful", data);
      if (data?.status === 1) {
        refetchWhiteListClaimed();
      } else {
        console.error("tx unsuccessful", data);
      }
    },
  });

  // listen for claimed tokenId
  useContractEvent({
    address: vars.NEXT_PUBLIC_SANDBOX_ASSETS_CONTRACT_ADDRESS,
    abi: erc1155abi,
    eventName: "TransferSingle",
    listener(
      operator: string,
      from: string,
      toAddress: string,
      tokenId: BigNumber
    ) {
      console.log("debug:: got transfer", operator, from, toAddress, tokenId);
      if (
        operator === from &&
        from === vars.NEXT_PUBLIC_SANDBOX_CLAIM_CONTRACT_ADDRESS &&
        toAddress === address
      ) {
        clearInterval(_interval as NodeJS.Timer);
        _setInterval(null);
        const id = tokenId.toString();
        setClaimedTokenId(id);
      }
    },
  });

  // set the claimed tokenId after inteval has been cleared &&
  useEffect(() => {
    if (claimedTokenId && !_interval) {
      const modelIndex = models
        .map((model) => model.tokenId)
        .indexOf(claimedTokenId);
      if (modelIndex === -1) {
        console.error("Could not find minted model");
      }
      setTimeout(() => {
        setModelIndex(modelIndex);
      }, MS_TO_ALERNATE_CLAIM + 500);
    }
  }, [_interval, claimedTokenId]);

  const isConnectedToTargetChain = useMemo(
    () => targetChain.id === chain?.id,
    [chain?.id]
  );

  const isWaiting = useMemo(
    () => isSignLoading || isTxLoading,
    [isSignLoading, isTxLoading]
  );

  const incrementModel = useCallback(() => {
    setModelIndex(modelIndex + 1);
    if (claimedTokenId) {
      setClaimedTokenId(null);
    }
  }, [modelIndex, setModelIndex, claimedTokenId]);
  const decrementModel = useCallback(() => {
    setModelIndex(modelIndex - 1);
    if (claimedTokenId) {
      setClaimedTokenId(null);
    }
  }, [modelIndex, setModelIndex, claimedTokenId]);
  const isIncrementDisabled = useMemo(
    () => modelIndex === models.length - 1,
    [modelIndex]
  );
  const isDecrementDisabled = useMemo(() => modelIndex === 0, [modelIndex]);

  // query if user is in whitelist
  useEffect(() => {
    if (address && isConnectedToTargetChain) {
      if (whitelist.includes(address)) {
        setIsInWhitelist(true);
      } else {
        setIsInWhitelist(false);
      }
    }
  }, [address, isConnectedToTargetChain, setIsInWhitelist]);

  // iterate through models & update rotation speed if user is claiming
  useEffect(() => {
    if (isWaiting) {
      if (rotationSpeed !== RotationSpeeds.Claiming) {
        setRotationSpeed(RotationSpeeds.Claiming);
      }

      let isIncreasing = true;

      const interval = setInterval(() => {
        setModelIndex((prevState) => {
          if (isIncreasing && prevState !== models.length - 1) {
            return prevState + 1;
          } else if (!isIncreasing && prevState !== 0) {
            return prevState - 1;
          } else if (isIncreasing && prevState === models.length - 1) {
            isIncreasing = false;
            return prevState - 1;
          } else if (!isIncreasing && prevState === 0) {
            isIncreasing = true;
            return prevState + 1;
          }
          return 0;
        });
      }, MS_TO_ALERNATE_CLAIM);
      _setInterval(interval);
    } else {
      setRotationSpeed(RotationSpeeds.Default);
      clearInterval(_interval as NodeJS.Timer);
      _setInterval(null);
    }

    return () => {
      if (_interval) {
        clearInterval(_interval);
      }
    };
  }, [isWaiting]);

  const renderAction = useCallback(() => {
    if (!isConnectedToTargetChain) {
      return (
        <BorderedText className={css("font-bold")}>
          ⛔ Please connect to {targetChain.network} ⛔
        </BorderedText>
      );
    } else if (claimedTokenId) {
      return (
        <BorderedText className={css("font-bold", "text-2xl", "mt-2")}>
          ✨ You claimed {model.name} ✨
        </BorderedText>
      );
    } else if (whitelistClaimed) {
      return (
        <BorderedText className={css("font-bold", "text-2xl", "mt-2")}>
          🛹 Thanks for claiming! 🛹
        </BorderedText>
      );
    } else if (!isInWhitelist) {
      return (
        <BorderedText className={css("font-bold")}>
          Sorry you are not in the whitelist!
        </BorderedText>
      );
    } else {
      return (
        <div>
          <Button
            disabled={isWaiting}
            onClick={() => {
              write?.();
            }}
          >
            Claim
          </Button>
        </div>
      );
    }
  }, [
    isWaiting,
    isConnectedToTargetChain,
    isInWhitelist,
    write,
    whitelistClaimed,
  ]);

  return (
    <div
      className={css("flex", "flex-col", "py-14", "bg-contain")}
      style={{ backgroundImage: `url(/images/lord-of-dogetown.jpeg)` }}
    >
      <div className={css("flex", "justify-center")}>
        <div className={css("max-w-xl", "w-full")}>
          <div className={css("max-w-xs", "w-full", "my-8", "m-auto")}>
            <Image
              width={798}
              height={405}
              src={"/images/lords-of-dogetown.png"}
              layout={"responsive"}
              alt={"Lords of Dogetown"}
            />
          </div>
          <div className={css("flex", "flex-col", "gap-8")}>
            <BorderedText className={css("font-normal")}>
              As part of our Lords of Dogetown project, we have 115{" "}
              <Link isExternal href={"https://twitter.com/TheSandboxGame"}>
                @TheSandboxGame
              </Link>{" "}
              wearable NFTs to give Pixel holders 🛹.
            </BorderedText>
            <BorderedText className={css("font-normal")}>
              There are 9 different wearables up for grabs with mixed rarity and{" "}
              <Link
                isExternal
                href={
                  "https://www.sandbox.game/en/collections/lords-of-dogetown-much-doge-pack/122/"
                }
              >
                value
              </Link>
              . This claim is {'"first come first serve"'} until all 115 are
              claimed 🏃. You will be given a random wearable selected from the
              9 available (seen below). The claim window will be open for 30
              days and you must have held a pixel by Nov 2nd to be eligible.
            </BorderedText>
            <div
              className={css(
                "border-2",
                "border-dashed",
                "relative",
                "h-[400px]",
                "relative"
              )}
            >
              <div
                className={css(
                  "absolute",
                  "left-0",
                  "top-0",
                  "w-full",
                  "h-full",
                  "bg-pixels-yellow-100",
                  "opacity-100"
                )}
              />
              <Canvas camera={{ position: [0, 0, 4.5] }}>
                <Suspense fallback={null}>
                  <PivotControls
                    visible={false}
                    lineWidth={1}
                    depthTest={false}
                  >
                    <Model
                      rotationSpeed={rotationSpeed}
                      url={model.url}
                      scale={model.scale}
                      position={model.position}
                    />
                  </PivotControls>
                  {/* {isDev() && (
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                      <GizmoViewport
                        axisColors={["red", "green", "blue"]}
                        labelColor="black"
                      />
                    </GizmoHelper>
                  )} */}
                  <ambientLight intensity={0.5} />
                </Suspense>
              </Canvas>
              {isWaiting && (
                <div
                  className={css(
                    "absolute",
                    "bottom-3",
                    "left-1/2",
                    "-translate-x-1/2",
                    "text-3xl"
                  )}
                >
                  <ColoredText bold>✨ CLAIMING ✨</ColoredText>
                </div>
              )}
              {!isWaiting && (
                <>
                  <div
                    className={css(
                      "absolute",
                      "bottom-7",
                      "left-1/2",
                      "-translate-x-1/2",
                      "font-bold",
                      "text-xl"
                    )}
                  >
                    {model.name}
                  </div>
                  <div
                    className={css(
                      "absolute",
                      "bottom-2",
                      "left-1/2",
                      "-translate-x-1/2",
                      "font-normal"
                    )}
                  >
                    {model.description}
                  </div>
                </>
              )}
            </div>
            <div className={css("flex", "flex-col", "gap-4", "items-center")}>
              <div className={css("flex", "gap-3")}>
                <Button
                  disabled={isWaiting || isDecrementDisabled}
                  onClick={decrementModel}
                >
                  <BsArrowLeft />
                </Button>
                <Button
                  disabled={isWaiting || isIncrementDisabled}
                  onClick={incrementModel}
                >
                  <BsArrowRight />
                </Button>
              </div>
              {contractData?.hash && isTxErrored && (
                <BorderedText>
                  <div
                    className={css("text-base", "text-red-600", "font-bold")}
                  >
                    TX failed. Please try with higher gas limit.
                  </div>
                </BorderedText>
              )}
              {renderAction()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ModelProps {
  url: string;
  scale: number;
  position: Vector3;
  rotationSpeed: number;
}

const Model: React.FC<ModelProps> = ({
  url,
  scale,
  position,
  rotationSpeed,
}) => {
  const ref = useRef<THREE.Mesh<
    THREE.BufferGeometry,
    THREE.Material | THREE.Material[]
  > | null>(null);
  const model = useLoader(GLTFLoader, url);
  useEffect(() => {
    ref.current?.rotateY(Math.PI);
  }, []);
  useFrame(({ clock }) => {
    ref.current!.rotation.y += rotationSpeed;
  });
  return (
    <mesh ref={ref} scale={scale} position={position}>
      <primitive object={model.scene} />
    </mesh>
  );
};
Model.displayName = "Model";

export default LordsOfDogetown;
