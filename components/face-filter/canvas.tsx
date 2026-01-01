"use client";

import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// @ts-expect-error: Module Typings
import { JEELIZFACEFILTER, NN_4EXPR } from "facefilter";
import { JeelizThreeFiberHelper } from "./contrib/faceFilter/JeelizThreeFiberHelper.js";

const _maxFacesDetected = 1;
const _faceFollowers: Array<THREE.Object3D | null> = new Array(_maxFacesDetected).fill(null);
let _expressions: FaceExpression[] = [];

interface FaceFollowerProps {
  faceIndex: number;
  expression: FaceExpression;
  modelPath: string;
  size: ProductSize;
}

const FaceFollower: React.FC<FaceFollowerProps> = (props) => {
  const objRef = useRef<THREE.Object3D | null>(null);
  const mouthOpenRef = useRef<THREE.Object3D | null>(null);
  const mouthSmileRef = useRef<THREE.Object3D | null>(null);
  // Add model here
  const gltf = useGLTF(props.modelPath) as { scene: THREE.Object3D };

  useEffect(() => {
    const threeObject3D = objRef.current;
    if (threeObject3D) {
      _faceFollowers[props.faceIndex] = threeObject3D;
    } else {
      _faceFollowers[props.faceIndex] = null;
    }
    return () => {
      _faceFollowers[props.faceIndex] = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    const s0 = Math.max(0.001, props.expression.mouthOpen);
    if (mouthOpenRef.current) {
      mouthOpenRef.current.scale.set(s0, 1, s0);
    }

    const s1 = Math.max(0.001, props.expression.mouthSmile);
    if (mouthSmileRef.current) {
      mouthSmileRef.current.scale.set(s1, 1, s1);
    }
  });

  const scaleFactors: Record<ProductSize, number> = {
    "XS": 0.6,
    "S": 0.8,
    "M": 1.0,
    "L": 1.2,
    "XL": 1.4
  }

  return (
    <object3D ref={objRef}>
      <primitive object={gltf.scene} position={[0, 0.8, 0]} scale={[scaleFactors[props.size], scaleFactors[props.size], scaleFactors[props.size]]} />
      <object3D ref={mouthOpenRef} />
      <object3D ref={mouthSmileRef} />
    </object3D>
  );
};

type ThreeFiberType = ReturnType<typeof useThree> | null;

interface ThreeGrabberProps {
  sizing: { width: number; height: number; top: number; left: number };
}

let _threeFiber: ThreeFiberType = null;

const ThreeGrabber: React.FC<ThreeGrabberProps> = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  _threeFiber = useThree();

  useFrame(() => {
    if (_threeFiber) {
      // @ts-expect-error: Has Camera Type
      JeelizThreeFiberHelper.update_camera(props.sizing, _threeFiber.camera);
    }
  });

  return null;
};

const compute_sizing = () => {
  const height = 956;
  const wWidth = 560;
  const width = Math.min(wWidth, height);
  const top = 0;
  const left = (wWidth - width) / 2;
  return { width, height, top, left };
};

const AugmentedRealityCamera: React.FC<{ modelPath: string, active: boolean, size: ProductSize }> = ({ modelPath, active, size }) => {
  _expressions = [];
  for (let i = 0; i < _maxFacesDetected; ++i) {
    _expressions.push({
      mouthOpen: 0,
      mouthSmile: 0,
      eyebrowFrown: 0,
      eyebrowRaised: 0,
    });
  }

  const [sizing, setSizing] = useState(compute_sizing());
  const [isInitialized, setIsInitialized] = useState(false);

  let _timerResize: number | null = null;

  const do_resize = () => {
    _timerResize = null;
    const newSizing = compute_sizing();
    setSizing(newSizing);
  };

  const handle_resize = () => {
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = window.setTimeout(do_resize, 200);
  };

  useEffect(() => {
    if (!_timerResize) {
      JEELIZFACEFILTER.resize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizing]);

  const callbackReady = (errCode: number | null, spec: unknown) => {
    if (errCode) {
      return;
    }
    JeelizThreeFiberHelper.init(spec, _faceFollowers, callbackDetect);
  };

  const callbackTrack = (detectStatesArg: DetectState | DetectState[]) => {
    const detectStates: DetectState[] = Array.isArray(detectStatesArg) ? detectStatesArg : [detectStatesArg];

    if (_threeFiber) {
      // @ts-expect-error: Has Camera Type
      JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera);
    }

    JEELIZFACEFILTER.render_video();

    detectStates.forEach((detectState, faceIndex) => {
      const exprIn = detectState.expressions;
      const expression = _expressions[faceIndex];
      expression.mouthOpen = exprIn[0];
      expression.mouthSmile = exprIn[1];
      expression.eyebrowFrown = exprIn[2];
      expression.eyebrowRaised = exprIn[3];
    });
  };

  const callbackDetect = (faceIndex: number, isDetected: boolean) => {
    if (isDetected) {
      
    } else {
      
    }
  };

  const faceFilterCanvasRef = useRef<HTMLCanvasElement | null>(null);
 
  useEffect(() => {
    window.addEventListener("resize", handle_resize);
    window.addEventListener("orientationchange", handle_resize);
    if (!isInitialized) return;

    JEELIZFACEFILTER.init({
    canvas: faceFilterCanvasRef.current,
    NNC: NN_4EXPR,
    maxFacesDetected: 1,
    followZRot: true,
    callbackReady,
    callbackTrack,
  });

    return () => {
      window.removeEventListener("resize", handle_resize);
      window.removeEventListener("orientationchange", handle_resize);
      if (typeof JEELIZFACEFILTER.destroy === "function") {
        JEELIZFACEFILTER.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  useEffect(() => {
    if (faceFilterCanvasRef.current) setIsInitialized(true);
  }, [faceFilterCanvasRef])

  return (
    <>
      <Canvas
        className="mirrorX"
        style={{
          position: "absolute",
          opacity: active ? 1 : 0,
          zIndex: 10,
          ...sizing,
        }}
        gl={{
          preserveDrawingBuffer: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} intensity={1} />
        <ThreeGrabber sizing={sizing} />
        <FaceFollower faceIndex={0} expression={_expressions[0]} modelPath={modelPath} size={size} />
      </Canvas>

      <canvas
        className="mirrorX"
        ref={faceFilterCanvasRef}
        style={{
          position: "absolute",
          opacity: active ? 1 : 0,
          zIndex: 5,
          ...sizing,
        }}
        width={sizing.width}
        height={sizing.height}
      />
    </>
  );
};

export default AugmentedRealityCamera;
