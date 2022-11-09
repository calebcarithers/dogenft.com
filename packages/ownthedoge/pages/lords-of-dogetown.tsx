import { GizmoHelper, GizmoViewport, PivotControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Button from "dsl/components/Button/Button";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { isDev } from "../environment";
import { css } from "../helpers/css";

interface Model {
  url: string;
  name: string;
  description: string;
  scale: number;
  position: Vector3;
}

const models: Model[] = [
  {
    url: "/models/doge-mech.gltf",
    name: "Mech",
    description: "Doge Mech",
    scale: 0.05,
    position: new Vector3(0, -1.2, 0),
  },
  {
    url: "/models/doge-backpack.gltf",
    name: "Doge Backpack",
    description: "A Doge backpack to wear",
    scale: 0.08,
    position: new Vector3(0, -2.7, 0),
  },
  {
    url: "/models/doge-drives.gltf",
    name: "Doge Drives",
    description: "A Doge driver",
    scale: 0.03,
    position: new Vector3(0, -0.7, 0),
  },
  {
    url: "/models/doge-head-hat.gltf",
    name: "Doge Head Hat",
    description: "A Doge hat to wear on your head",
    scale: 0.09,
    position: new Vector3(0, -5, 0),
  },
  {
    url: "/models/doge-paw-slippers.gltf",
    name: "Doge Paw Slippers",
    description: "Doge slippers for your feet",
    scale: 0.1,
    position: new Vector3(0, 0, 0),
  },
  {
    url: "/models/doge-rest.gltf",
    name: "Doge Rest",
    description: "Doge for resting",
    scale: 0.02,
    position: new Vector3(0, -1, 0),
  },
  {
    url: "/models/doge-statue.gltf",
    name: "Doge Statue",
    description: "Doge statue for worship",
    scale: 0.03,
    position: new Vector3(0, -2.2, 0),
  },
  {
    url: "/models/doge-tail.gltf",
    name: "Doge Tail",
    description: "Doge tail for wearing",
    scale: 0.1,
    position: new Vector3(0, -2, 0),
  },
];

const LordsOfDogetown = () => {
  const [modelIndex, setModelIndex] = useState(7);
  const model = useMemo(() => models[modelIndex], [modelIndex]);

  const incrementModel = () => setModelIndex(modelIndex + 1);
  const decrementModel = () => setModelIndex(modelIndex - 1);
  const isIncrementDisabled = modelIndex === models.length - 1;
  const isDecrementDisabled = modelIndex === 0;

  return (
    <div
      className={css("flex", "flex-col", "pt-14", "bg-contain")}
      style={{ backgroundImage: `url(/images/lord-of-dogetown.jpeg)` }}
    >
      <div className={css("flex", "justify-center")}>
        <div className={css("max-w-xl", "w-full", "border-2", "border-dashed")}>
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
                "font-bold"
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
                "h-[400px]"
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
                  "opacity-80"
                )}
              />
              <Canvas camera={{ position: [0, 0, 4.5] }}>
                <Suspense fallback={null}>
                  <PivotControls lineWidth={1} depthTest={false}>
                    <Model
                      url={model.url}
                      scale={model.scale}
                      position={model.position}
                    />
                  </PivotControls>
                  {isDev() && (
                    <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                      <GizmoViewport
                        axisColors={["red", "green", "blue"]}
                        labelColor="black"
                      />
                    </GizmoHelper>
                  )}
                  <ambientLight intensity={0.5} />
                </Suspense>
              </Canvas>
            </div>
            <div className={css("flex", "flex-col", "gap-4", "items-center")}>
              <div className={css("flex", "gap-3")}>
                <Button disabled={isDecrementDisabled} onClick={decrementModel}>
                  <BsArrowLeft />
                </Button>
                <Button disabled={isIncrementDisabled} onClick={incrementModel}>
                  <BsArrowRight />
                </Button>
              </div>
              <div>
                <Button>Mint</Button>
              </div>
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
}

const Model: React.FC<ModelProps> = ({ url, scale, position }) => {
  const ref = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(null);
  const model = useLoader(GLTFLoader, url);
  useEffect(() => {
    ref.current?.rotateY(Math.PI);
  }, []);
  useFrame(({ clock }) => {
    ref.current!.rotation.y += 0.01;
  });
  return (
    <mesh ref={ref} scale={scale} position={position}>
      <primitive object={model.scene} />
    </mesh>
  );
};
Model.displayName = "Model";

export default LordsOfDogetown;
