import axios from "axios";
import { ethers } from "ethers";
import { action, computed, makeObservable, observable } from "mobx";
import { vars } from "../environment/vars";
import FractionManagerABI from "../services/abis/fractionManager";

class FractionStore {
  contractAddress = vars.NEXT_PUBLIC_FRACTION_MANAGER_CONTRACT_ADDRESS;
  abi: any = FractionManagerABI;

  @observable
  isClaiming = false;

  @observable
  availablePixelIds: number[] = [];

  @observable
  usedPixelIds: number[] = [];

  @observable
  isPaused = true;

  @observable
  contract?: ethers.Contract;

  @observable
  signer?: ethers.Signer | null;

  @observable
  isClaimOpen = false;

  @observable
  isGetClaimLoading = false;

  @observable
  isClaimOpenLoading = false;

  @observable
  inputValue = "";

  @observable
  maxInputValue = 0;

  constructor(
    private tokenToClaimAddress: string,
    private tokenToClaimId: number
  ) {
    makeObservable(this);
  }

  async claim() {
    if (this.contract) {
      this.isClaiming = true;
      try {
        const pixelIds = this.availablePixelIds.slice(
          0,
          Number(this.inputValue)
        );
        const tx = await this.contract.claim(
          this.tokenToClaimAddress,
          this.tokenToClaimId,
          pixelIds
        );
        await tx.wait();
        this.inputValue = "";
        await this.getCanClaim();
      } catch (e) {
      } finally {
        this.isClaiming = false;
      }
    }
  }

  @action
  async getIsClaimOpen() {
    if (this.contract) {
      this.isClaimOpenLoading = true;
      this.isClaimOpen = await this.contract.getIsClaimOpen(
        this.tokenToClaimAddress,
        this.tokenToClaimId
      );
      this.isClaimOpenLoading = false;
    }
  }

  @action
  async getCanClaim() {
    this.availablePixelIds = [];
    const newIds: number[] = [];
    const usedIds: number[] = [];
    if (this.contract && this.signer) {
      const address = await this.signer.getAddress();
      try {
        if (vars.NEXT_PUBLIC_PIXEL_HOLDER_API) {
          this.isGetClaimLoading = true;
          const pixelResponse = await axios.get(
            vars.NEXT_PUBLIC_PIXEL_HOLDER_API
          );
          const pixelHolders = Object.keys(pixelResponse.data);

          if (pixelHolders.includes(address)) {
            const pixelIds = pixelResponse.data[address].tokenIds;
            for (let i = 0; i < pixelIds.length; i++) {
              const pixelId = pixelIds[i];
              const isClaimed = await this.contract.hasPixelClaimed(
                this.tokenToClaimAddress,
                this.tokenToClaimId,
                pixelId
              );
              if (!isClaimed && !newIds.includes(pixelIds)) {
                newIds.push(pixelId);
              } else {
                usedIds.push(pixelId);
              }
            }
            this.availablePixelIds = newIds;
            this.usedPixelIds = usedIds;
          }
          this.isGetClaimLoading = false;
        } else {
          throw new Error("Missing env var");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("could not get signer and contract");
    }
  }

  @computed
  get canClaim() {
    return this.availablePixelIds.length > 0;
  }

  @computed
  get hasAlreadyClaimed() {
    return this.usedPixelIds.length > 0;
  }

  @action
  onInputChange(value: string) {
    this.inputValue = value;
  }
}

export default FractionStore;
