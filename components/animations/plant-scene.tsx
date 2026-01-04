"use client";

import React, { useMemo, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Float, useTexture, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

// --- Asset Paths ---
const MODEL_PATHS = {
    plant1: "/c30lumexfif4-eb_house_plant_01/eb_house_plant_01/eb_house_plant_01.obj",
    plant2: "/cim59vrioikg-IndoorPotPlant/IndoorPotPlant/extracted/indoor plant_02.obj",
    texture2: "/cim59vrioikg-IndoorPotPlant/IndoorPotPlant/extracted/textures/indoor plant_2_COL.jpg"
};

// --- Preload ---
if (typeof window !== "undefined") {
    useLoader.preload(OBJLoader, MODEL_PATHS.plant1);
    useLoader.preload(OBJLoader, MODEL_PATHS.plant2);
    useTexture.preload(MODEL_PATHS.texture2);
}

// --- Plant Model Component ---
const PlantModel = ({
    objPath,
    texturePath,
    position,
    scale,
    rotation
}: {
    objPath: string;
    texturePath?: string;
    position: [number, number, number];
    scale: number;
    rotation?: [number, number, number];
}) => {
    const obj = useLoader(OBJLoader, objPath);
    const texture = texturePath ? useTexture(texturePath) : null;

    const scene = useMemo(() => {
        const clone = obj.clone();
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                if (texture) {
                    texture.flipY = false;
                    mesh.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        roughness: 0.8,
                        metalness: 0,
                    });
                } else {
                    const matName = (mesh.material as THREE.Material).name.toLowerCase();
                    const isLeaf = matName.includes("leaf") || matName.includes("leaves");

                    mesh.material = new THREE.MeshStandardMaterial({
                        color: isLeaf ? "#558b2f" : "#a05a41",
                        roughness: isLeaf ? 0.6 : 0.9,
                        metalness: isLeaf ? 0.1 : 0,
                    });
                }
            }
        });
        return clone;
    }, [obj, texture]);

    return (
        <group position={position} scale={scale} rotation={rotation ? new THREE.Euler(...rotation) : undefined}>
            <primitive object={scene} />
        </group>
    );
};

// --- Hooks ---
function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);

    return isMobile;
}

// --- Main Scene Component ---
export const PlantScene = ({ className }: { className?: string }) => {
    const isMobile = useIsMobile();

    // PERFORMANCE: Completely disable 3D Canvas on mobile to reduce load
    if (isMobile) {
        return null;
    }

    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 1, 6], fov: 45 }}
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    {/* ✅ DESKTOP → ALL PLANTS */}
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        <PlantModel
                            objPath={MODEL_PATHS.plant1}
                            position={[-1.5, -1, 0]}
                            scale={0.3}
                            rotation={[0, 0.5, 0]}
                        />
                    </Float>

                    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
                        <PlantModel
                            objPath={MODEL_PATHS.plant2}
                            texturePath={MODEL_PATHS.texture2}
                            position={[1.5, -0.5, 0]}
                            scale={0.5}
                            rotation={[0, -0.3, 0]}
                        />
                    </Float>
                </Suspense>
            </Canvas>
        </div>
    );
};
