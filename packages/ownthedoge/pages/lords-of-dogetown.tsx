import { PivotControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Button from "dsl/components/Button/Button";
import ColoredText from "dsl/components/ColoredText/ColoredText";
import Image from "next/image";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAccount, useNetwork } from "wagmi";
import { getDogetownWhitelist } from "../environment";
import { css } from "../helpers/css";
import { targetChain } from "../services/wagmi";

interface Model {
  url: string;
  name: string;
  description: string;
  scale: number;
  position: Vector3;
  tokenId: number;
}

const models: Model[] = [
  {
    url: "/models/doge-mech.gltf",
    name: "Mech",
    description: "Doge Mech",
    scale: 0.05,
    position: new Vector3(0, -1.2, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980232,
  },
  {
    url: "/models/doge-backpack.gltf",
    name: "Doge Backpack",
    description: "A Doge backpack to wear",
    scale: 0.08,
    position: new Vector3(0, -2.7, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980231,
  },
  {
    url: "/models/doge-drives.gltf",
    name: "Doge Drives",
    description: "A Doge driver",
    scale: 0.03,
    position: new Vector3(0, -0.7, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980230,
  },
  {
    url: "/models/doge-head-hat.gltf",
    name: "Doge Head Hat",
    description: "A Doge hat to wear on your head",
    scale: 0.09,
    position: new Vector3(0, -5, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980227,
  },
  {
    url: "/models/doge-paw-slippers.gltf",
    name: "Doge Paw Slippers",
    description: "Doge slippers for your feet",
    scale: 0.1,
    position: new Vector3(0, 0, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980229,
  },
  {
    url: "/models/doge-rest.gltf",
    name: "Doge Rest",
    description: "Doge for resting",
    scale: 0.02,
    position: new Vector3(0, -1, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980226,
  },
  {
    url: "/models/doge-statue.gltf",
    name: "Doge Statue",
    description: "Doge statue for worship",
    scale: 0.028,
    position: new Vector3(0, -1.9, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980224,
  },
  {
    url: "/models/doge-tail.gltf",
    name: "Doge Tail",
    description: "Doge tail for wearing",
    scale: 0.1,
    position: new Vector3(0, -2, 0),
    tokenId: 67031862187656528318453779715773770542811847030081758913959388841425388980225,
  },
];

enum RotationSpeeds {
  Default = 0.01,
  Claiming = 0.1,
  Static = 0,
}

const whitelist = getDogetownWhitelist();

const LordsOfDogetown = () => {
  const [isInWhitelist, setIsInWhitelist] = useState(false);
  const [modelIndex, setModelIndex] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(RotationSpeeds.Default);
  const [_interval, _setInterval] = useState<NodeJS.Timer | null>(null);
  const model = useMemo(() => models[modelIndex], [modelIndex]);

  const { chain } = useNetwork();
  const { address, isConnecting } = useAccount();

  const isConnectedToTargetChain = targetChain.id === chain?.id;

  const incrementModel = useCallback(
    () => setModelIndex(modelIndex + 1),
    [modelIndex, setModelIndex]
  );
  const decrementModel = useCallback(
    () => setModelIndex(modelIndex - 1),
    [modelIndex, setModelIndex]
  );
  const isIncrementDisabled = useMemo(
    () => modelIndex === models.length - 1,
    [modelIndex]
  );
  const isDecrementDisabled = useMemo(() => modelIndex === 0, [modelIndex]);

  useEffect(() => {
    if (address && isConnectedToTargetChain) {
      if (whitelist.includes(address)) {
        setIsInWhitelist(true);
      } else {
        setIsInWhitelist(false);
      }
    }
  }, [address, isConnectedToTargetChain]);

  useEffect(() => {
    if (isClaiming) {
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
      }, 500);
      _setInterval(interval);
    } else {
      setRotationSpeed(RotationSpeeds.Default);
      clearInterval(_interval as NodeJS.Timer);
    }
  }, [isClaiming]);

  const renderAction = useCallback(() => {
    if (!isConnectedToTargetChain) {
      return (
        <div
          className={css(
            "text-xl",
            "font-bold",
            "bg-pixels-yellow-100",
            "p-3",
            "border-2",
            "border-dashed"
          )}
        >
          ⛔ Please connect to {targetChain.network} ⛔
        </div>
      );
    } else if (!isInWhitelist) {
      return (
        <div
          className={css(
            "text-xl",
            "font-bold",
            "bg-pixels-yellow-100",
            "p-3",
            "border-2",
            "border-dashed"
          )}
        >
          Sorry you are not in the whitelist!
        </div>
      );
    } else {
      return (
        <div>
          <Button disabled={isClaiming} onClick={() => setIsClaiming(true)}>
            Mint
          </Button>
          {isClaiming && (
            <Button onClick={() => setIsClaiming(false)}>Stop Claim</Button>
          )}
        </div>
      );
    }
  }, [chain?.id, isClaiming]);

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
            <div
              className={css(
                "border-2",
                "border-dashed",
                "bg-pixels-yellow-100",
                "text-xl",
                "font-bold",
                "p-3"
              )}
            >
              Welcome to the November Pixel Perk! The Lords of Dogetown
              released. Mint a random NFT from the sandbox drop.
            </div>
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
              {isClaiming && (
                <div
                  className={css(
                    "absolute",
                    "bottom-3",
                    "left-1/2",
                    "-translate-x-1/2",
                    "text-3xl"
                  )}
                >
                  <ColoredText bold>...CLAIMING...</ColoredText>
                </div>
              )}
              {!isClaiming && (
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
                  disabled={isClaiming || isDecrementDisabled}
                  onClick={decrementModel}
                >
                  <BsArrowLeft />
                </Button>
                <Button
                  disabled={isClaiming || isIncrementDisabled}
                  onClick={incrementModel}
                >
                  <BsArrowRight />
                </Button>
              </div>
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
  const ref = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(null);
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
