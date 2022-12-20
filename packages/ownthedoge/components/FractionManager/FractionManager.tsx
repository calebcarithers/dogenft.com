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
  buttonType?: ButtonType;
}> = observer(
  ({ contractAddress, tokenId, buttonType = ButtonType.Primary }) => {
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
      if (fractionStore.signer && chain?.id) {
        if (targetChain.id !== chain?.id) {
          return `Please connect to: ${targetChain.name}`;
        } else if (
          fractionStore.isGetClaimLoading ||
          fractionStore.isClaimOpenLoading
        ) {
          return (
            <div className={css("w-full", "animate-ping")}>
              <div className={css("relative", "w-full")}>
                <Image src="/images/doage.png" width={25} height={25} />
              </div>
              <div className={css("text-sm", "font-normal", "-mt-2")}>wow</div>
            </div>
          );
        } else if (!fractionStore.isClaimOpen) {
          return <div>Claim closed!</div>;
        } else if (fractionStore.canClaim) {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fractionStore.claim();
              }}
              className={css(
                "flex",
                "flex-col",
                "space-y-4",
                "w-full",
                "justify-center",
                "items-center"
              )}
            >
              <div className={css("max-w-sm", "w-full")}>
                <input
                  disabled={fractionStore.isClaiming}
                  type={"number"}
                  required
                  name={"input-value"}
                  min={1}
                  max={fractionStore.availablePixelIds.length}
                  className={css(
                    "text-black",
                    "placeholder:text-sm",
                    "p-3",
                    "rounded-lg",
                    "w-full",
                    "disabled:opacity-98"
                  )}
                  value={fractionStore.inputValue}
                  onChange={(e) => fractionStore.onInputChange(e.target.value)}
                  placeholder={`# fractions (max: ${fractionStore.availablePixelIds.length})`}
                />
              </div>
              <Button
                submit
                type={buttonType}
                isLoading={fractionStore.isClaiming}
                disabled={
                  chain?.id !== targetChain.id ||
                  fractionStore.inputValue === ""
                }
              >
                ✨ Claim ✨
              </Button>
            </form>
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
            <ConnectButton type={buttonType} />{" "}
            <div className={css("ml-4")}>to claim</div>
          </div>
        );
      }
    }, [
      fractionStore.availablePixelIds,
      fractionStore.signer,
      fractionStore.isGetClaimLoading,
      fractionStore.isClaimOpenLoading,
      chain?.id,
      buttonType,
      fractionStore.inputValue,
      fractionStore.onInputChange,
    ]);

    return (
      <div
        className={css(
          "flex",
          "justify-center",
          "text-center",
          "font-bold",
          "w-full"
        )}
      >
        {renderIndicator()}
      </div>
    );
  }
);

export default FractionManager;
