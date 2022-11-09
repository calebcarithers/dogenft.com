import { PresentationControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import Button from "dsl/components/Button/Button";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { css } from "../helpers/css";

const LordsOfDogetown = () => {
  return (
    <div className={css("flex", "flex-col", "mt-10")}>
      <div className={css("flex", "justify-center")}>
        <div className={css("max-w-xs", "w-full")}>
          <Image
            width={798}
            height={405}
            src={"/images/lords-of-dogetown.png"}
            layout={"responsive"}
            alt={"Lords of Dogetown"}
          />
        </div>
      </div>
      <div
        className={css("max-h-[400px]", "h-full", "border-2", "border-dashed")}
      >
        <ThreeScene />
      </div>
      <div>
        <Button>Mint</Button>
      </div>
    </div>
  );
};

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <Suspense fallback={null}>
        <PresentationControls
          enabled={true} // the controls can be disabled by setting this to false
          global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={false} // Snap-back to center (can also be a spring config)
          speed={1} // Speed factor
          zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, Math.PI, 0]} // Default rotation
          polar={[0, Math.PI / 2]} // Vertical limits
          azimuth={[-Infinity, Infinity]} // Horizontal limits
          config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
        >
          <Model />
        </PresentationControls>
        <ambientLight intensity={0.5} />
      </Suspense>
    </Canvas>
  );
};

const Model = () => {
  const ref = useRef<any>();
  const model = useLoader(GLTFLoader, "/models/doge-mech.gltf");
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(ref.current.position);
  }, []);
  return (
    <mesh ref={ref} scale={0.1}>
      <primitive object={model.scene} />
    </mesh>
  );
};
Model.displayName = "Model";

export default LordsOfDogetown;
