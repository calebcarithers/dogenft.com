import { Comic_Neue } from "@next/font/google";
import { PivotControls, useVideoTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import { css } from "dsl/helpers/css";
import Head from "next/head";
import { Suspense, useRef } from "react";
import THREE, { DoubleSide, TextureLoader } from "three";

const comicNeue = Comic_Neue({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
});

export default function Home() {
  // const [isLowPower, setIsLowPower] = useState(false);
  // const node = useCallback((node: HTMLVideoElement) => {
  //   if (node) {
  //     node.addEventListener("suspend", () => setIsLowPower(true));
  //   }
  // }, []);

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
                <Video isLowPower={false} />
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
              "flex-col",
              "p-4"
              // "items-center"
            )}
          >
            <div className={css("grow")} />
            <div className={css("grow", "text-center", "flex", "flex-col")}>
              <ColoredText
                className={css(comicNeue.className, "text-3xl", "md:text-5xl")}
              >
                something is coming
              </ColoredText>
              <div
                className={css("grow", "flex", "items-end", "justify-center")}
              >
                <a
                  href="mailto:wow@ownthedoge.com"
                  className={css(
                    "hover:text-red-700",
                    "cursor-pointer",
                    "text-white",
                    "opacity-85",
                    comicNeue.className
                  )}
                >
                  get in contact
                </a>
              </div>
            </div>
          </div>
          {/* <div className={css("absolute", "inset-0", "opacity-0")}>
            <video ref={node} autoPlay playsInline>
              <source src="./videos/wow.mp4" width={10} height={10} />
            </video>
          </div> */}
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
