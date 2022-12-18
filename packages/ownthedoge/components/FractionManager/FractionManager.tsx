import Button, {
  ButtonType,
  ConnectButton,
} from "dsl/components/Button/Button";
import Link from "dsl/components/Link/Link";
import { ethers } from "ethers";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useCallback, useEffect, useMemo } from "react";
import { useNetwork, useSigner } from "wagmi";
import { isDev } from "../../environment";
import { css } from "../../helpers/css";
import { targetChain } from "../../services/wagmi";
import FractionStore from "../../stores/Fraction.store";

const FractionManager: React.FC<{
  contractAddress: string;
  tokenId: number;
  claimButtonType?: ButtonType;
}> = observer(
  ({ contractAddress, tokenId, claimButtonType = ButtonType.Primary }) => {
    const fractionStore = useMemo(
      () => new FractionStore(contractAddress, tokenId),
      [contractAddress, tokenId]
    );
    const { chain } = useNetwork();
    const { data: signer } = useSigner();
    useEffect(() => {
      fractionStore.signer = signer;
      if (fractionStore.contractAddress && fractionStore.abi && signer) {
        fractionStore.contract = new ethers.Contract(
          fractionStore.contractAddress,
          fractionStore.abi,
          signer
        );
        fractionStore.getIsClaimOpen();
        fractionStore.getCanClaim();
      }
    }, [
      signer,
      fractionStore.contractAddress,
      fractionStore.abi,
      fractionStore,
    ]);

    const renderIndicator = useCallback(() => {
      if (fractionStore.signer) {
        if (targetChain.id !== chain?.id) {
          return `Please connect to: ${targetChain.name}`;
        } else if (
          fractionStore.isGetClaimLoading ||
          fractionStore.isClaimOpenLoading
        ) {
          return (
            <div className={css("w-full")}>
              <div className={css("relative", "w-full", "animate-ping")}>
                <Image src="/images/doage.png" width={25} height={25} />
              </div>
              <div className={css("text-base", "font-normal")}>wow</div>
            </div>
          );
        } else if (!fractionStore.isClaimOpen) {
          return <div>Claim closed!</div>;
        } else if (fractionStore.canClaim) {
          return (
            <Button
              type={claimButtonType}
              isLoading={fractionStore.isClaiming}
              disabled={chain?.id !== targetChain.id}
              onClick={() => fractionStore.claim()}
            >
              ✨ Claim ({fractionStore?.availablePixelIds.length}) ✨
            </Button>
          );
        } else if (fractionStore.hasAlreadyClaimed) {
          return "🌠 Thanks for claiming! 🌠";
        } else {
          return (
            <div>
              <div>No pixels found!</div>
              <div>
                Mint one{" "}
                <Link
                  isExternal
                  href={
                    isDev()
                      ? "https://dev.pixels.ownthedoge.com"
                      : "https://pixels.ownthedoge.com"
                  }
                >
                  here
                </Link>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className={css("flex", "items-center")}>
            <ConnectButton /> <div className={css("ml-4")}>to claim</div>
          </div>
        );
      }
    }, [
      fractionStore.availablePixelIds,
      fractionStore.signer,
      fractionStore.isGetClaimLoading,
      fractionStore.isClaimOpenLoading,
      chain?.id,
      claimButtonType,
    ]);

    return (
      <div
        className={css(
          "flex",
          "justify-center",
          "text-center",
          "font-bold",
          "text-2xl"
        )}
      >
        {renderIndicator()}
      </div>
    );
  }
);

export default FractionManager;
