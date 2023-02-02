import { Comic_Neue } from "@next/font/google";
import { PivotControls, useVideoTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { css } from "dsl/helpers/css";
import Head from "next/head";
import { Suspense, useCallback, useRef, useState } from "react";
import THREE, { DoubleSide, TextureLoader } from "three";

const comicNeue = Comic_Neue({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export default function Home() {
  const [isLowPower, setIsLowPower] = useState(false);
  const node = useCallback((node: HTMLVideoElement) => {
    node.addEventListener("suspend", () => setIsLowPower(true));
  }, []);

  return (
    <>
      <Head>
        <title>Much Wow Film</title>
        <meta name="description" content="Something is coming..." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={css(
          "bg-[#4893ca]",
          "h-screen",
          "w-screen",
          "bg-cover",
          "bg-center"
        )}
        style={{ backgroundImage: `url(images/cloud.png)` }}
      >
        <div className={css("relative", "h-screen", "w-screen", "fadeIn")}>
          <Canvas camera={{ position: [0, 0, 20] }} className={css("grow")}>
            <Suspense fallback={null}>
              <PivotControls visible={false} lineWidth={1} depthTest={false}>
                <Video isLowPower={isLowPower} />
              </PivotControls>
              <ambientLight intensity={0.5} />
            </Suspense>
          </Canvas>
          <div
            className={css(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "flex",
              "justify-center",
              "items-center"
            )}
          >
            <ColoredText
              className={css(comicNeue.className, "text-3xl", "md:text-5xl")}
            >
              something is coming
            </ColoredText>
          </div>
          <div className={css("hidden")}>
            <video ref={node} />
          </div>
        </div>
      </main>
    </>
  );
}

const Video: React.FC<{ isLowPower: boolean }> = ({ isLowPower }) => {
  const videoTexture = useVideoTexture("./videos/wow.mp4", {
    autoplay: true,
    playsInline: true,
    loop: true,
    muted: true,
    defaultMuted: true,
    preload: "auto",
    crossOrigin: "anonymous",
  });

  const imageTexture = useLoader(TextureLoader, "./images/kabosu.png");
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(() => {
    if (ref.current !== null) {
      ref.current.rotation.y += 0.02;
    }
  });

  const aspectRatio = 1.777777778;
  const height = 10;
  const imageAspectRatio = 1.333333333333333;
  const width = (isLowPower ? imageAspectRatio : aspectRatio) * height;

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        map={isLowPower ? imageTexture : videoTexture}
        toneMapped={false}
        side={DoubleSide}
      />
    </mesh>
  );
};
