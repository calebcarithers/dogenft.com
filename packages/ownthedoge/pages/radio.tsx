import { ethers } from "ethers";
import { observer } from "mobx-react-lite";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BsDot,
  BsPlayFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
} from "react-icons/bs";
import { MdPause } from "react-icons/md";
import { useNetwork, useSigner } from "wagmi";
import Button, { BackOrHomeButton } from "../../dsl/components/Button/Button";
import Link, { LinkSize, LinkType } from "../../dsl/components/Link/Link";
import { isProduction } from "../environment";
import { css } from "../helpers/css";
import PageLayout from "../layouts/Page/Page.layout";
import { targetChain } from "../services/wagmi";
import NftRadioStore, { Song } from "../stores/NftRadio.store";
import SongStore from "../stores/Song.store";
import { TITLE } from "./_app";

const Radio = observer(() => {
  const store = useMemo(() => new NftRadioStore(), []);
  return (
    <>
      <Head>
        <title>{TITLE} | Radio </title>
      </Head>
      <PageLayout>
        <BackOrHomeButton />
        <div
          className={css(
            "flex",
            "justify-center",
            "mt-16",
            "flex-col",
            "items-center",
            "h-full",
            "px-4"
          )}
        >
          <div
            className={css(
              "border-2",
              "border-black",
              "p-3",
              "bg-pixels-yellow-100"
            )}
            style={{ boxShadow: "10px 10px" }}
          >
            <RadioSong song={store.selectedSong} store={store} />
          </div>
        </div>
      </PageLayout>
    </>
  );
});

interface FeaturedSongI {
  song: Song;
  store: NftRadioStore;
}

const RadioSong: React.FC<FeaturedSongI> = observer(({ song, store }) => {
  const songStore = useMemo(() => new SongStore(), [song.name]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  useEffect(() => {
    songStore.signer = signer;
    if (song.contractAddress && song.abi && signer) {
      songStore.contract = new ethers.Contract(
        song.contractAddress,
        song.abi,
        signer
      );
      songStore.getCanMint();
    }
  }, [signer, song.contractAddress, song.abi]);

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      songStore.onTimeUpdate(video);
    }
  };

  useEffect(() => {
    onTimeUpdate();
    songStore.init();
    return () => {
      songStore.destroy();
    };
  }, []);

  const renderIndicator = useCallback(() => {
    if (song.isActive) {
      if (songStore.signer) {
        if (songStore.hasClaimed) {
          return (
            <div className={css("text-center")}>
              <div className={css("text-pixels-yellow-400", "font-bold")}>
                ✨ minted ✨
              </div>
              <div>
                View on{" "}
                <Link
                  isExternal
                  href={
                    isProduction()
                      ? "https://opensea.io/collection/in-doge-we-trust-idwt"
                      : "https://testnets.opensea.io/collection/in-doge-we-trust-final"
                  }
                >
                  OpenSea
                </Link>
              </div>
            </div>
          );
        } else {
          return <div>Claim closed!</div>;
        }
      } else {
        return (
          <div className={css("text-pixels-yellow-400", "font-bold")}>
            connect wallet to mint
          </div>
        );
      }
    } else {
      return (
        <div className={css("text-pixels-yellow-400")}>un-released track</div>
      );
    }
  }, [
    song,
    songStore.availablePixelId,
    songStore.hasClaimed,
    songStore.signer,
    song.isActive,
  ]);

  return (
    <div className={css("grid", "grid-cols-1", "md:grid-cols-5")}>
      <div className={css("col-span-1", "md:col-span-2")}>
        <div
          className={css(
            "relative",
            "border-black",
            "border-2",
            "w-full",
            "max-w-xs"
          )}
        >
          {song.videoSrc && (
            <video
              ref={videoRef}
              className={css("w-full")}
              onTimeUpdate={onTimeUpdate}
            >
              <source src={song.videoSrc} />
            </video>
          )}
          {!song.videoSrc && (
            <div
              className={css("bg-pixels-yellow-300")}
              style={{ height: 316, width: 316 }}
            />
          )}
        </div>
      </div>
      <div
        className={css(
          "col-span-1",
          "md:col-span-3",
          "md:px-3",
          "py-3",
          "md:ml-3"
        )}
      >
        <div className={css("flex", "flex-col", "h-full")}>
          <div
            className={css(
              "grow",
              "flex",
              "items-center",
              "w-full",
              "flex-col",
              "justify-center"
            )}
          >
            <div className={css("flex", "flex-col", "w-full")}>
              <div className={css("font-bold", "text-xl")}>{song.name}</div>
              <div
                className={css(
                  "flex",
                  "items-center",
                  "space-x-1",
                  "text-sm",
                  "text-pixels-yellow-500"
                )}
              >
                <div>single</div>
                <div>
                  <BsDot />
                </div>
                <div>{song.year}</div>
                <div>
                  <BsDot />
                </div>
                <div>1 song</div>
              </div>
              <div className={css("flex", "items-center", "space-x-1")}>
                {song.artists.map((artist, index, arr) => {
                  return (
                    <div key={`artist-${index}`}>
                      <Link
                        isExternal
                        type={LinkType.Secondary}
                        href={artist.link}
                      >
                        {artist.name}
                      </Link>
                      {index !== arr.length - 1 && (
                        <span className={css("text-pixels-yellow-500")}>,</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div
                className={css("w-full", "bg-black", "my-2")}
                style={{ height: "2px" }}
              />
              <div className={css("flex", "justify-between", "items-center")}>
                <div className={css("flex", "space-x-1", "text-sm")}>
                  <div>{songStore.currentTime}</div>
                  <div>/</div>
                  <div>{songStore.duration}</div>
                </div>
                {song.lyricsLink && (
                  <Link size={LinkSize.xs} isExternal href={song.lyricsLink}>
                    lyrics
                  </Link>
                )}
              </div>
            </div>
            <div className={css("flex", "justify-center", "mt-6")}>
              {targetChain.id === chain?.id
                ? renderIndicator()
                : `Please connect to: ${targetChain.name}`}
            </div>
          </div>
          <div
            className={css(
              "flex",
              "items-center",
              "justify-between",
              "mt-5",
              "md:mt-0"
            )}
          >
            <div className={css("flex", "items-center", "space-x-5")}>
              <Button
                disabled={!store.canGoBack}
                onClick={() => store.previousSong()}
              >
                <BsSkipBackwardFill />
              </Button>
              <Button
                disabled={!song.isActive}
                onClick={() => {
                  if (videoRef.current) {
                    const video = videoRef.current;
                    if (video.paused) {
                      video.play();
                      songStore.isPaused = false;
                    } else {
                      video.pause();
                      songStore.isPaused = true;
                    }
                  }
                }}
              >
                {songStore.isPaused && <BsPlayFill />}
                {!songStore.isPaused && <MdPause />}
              </Button>
              <Button
                disabled={!store.canGoNext}
                onClick={() => store.nextSong()}
              >
                <BsSkipForwardFill />
              </Button>
            </div>
            <div
              className={css(
                "text-sm",
                "text-gray-600",
                "px-10",
                "text-center"
              )}
            >
              Checkout the Soulbound drop <Link href="/birthday">here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Radio;
