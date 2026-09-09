"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import type { CrystalStructure } from "@/lib/types";
import { buildLattice, styleForElement } from "@/lib/crystal-utils";
import UnitCell from "./UnitCell";

/** Reused scratch objects for the bond-orientation quaternion trick below —
 * avoids allocating new THREE.Vector3/Quaternion instances per bond per render. */
const UP_AXIS = new THREE.Vector3(0, 1, 0);

interface CrystalViewerProps {
  structure: CrystalStructure;
  className?: string;
}

interface ViewerToggles {
  atoms: boolean;
  bonds: boolean;
  unitCell: boolean;
  labels: boolean;
}

const REPEAT_OPTIONS: Array<{ label: string; value: [number, number, number] }> = [
  { label: "1 × 1 × 1", value: [1, 1, 1] },
  { label: "2 × 2 × 2", value: [2, 2, 2] },
  { label: "3 × 3 × 3", value: [3, 3, 3] }
];

function LatticeScene({ structure, repeat, toggles }: { structure: CrystalStructure; repeat: [number, number, number]; toggles: ViewerToggles }) {
  const { atoms, bonds, matrix, cellEdges, center } = useMemo(
    () => buildLattice(structure, repeat),
    [structure, repeat]
  );

  return (
    <group>
      {toggles.atoms &&
        atoms.map((atom) => {
          const style = styleForElement(atom.element);
          return (
            <group key={atom.key} position={atom.position}>
              <mesh castShadow receiveShadow>
                <sphereGeometry args={[style.radius, 24, 24]} />
                <meshStandardMaterial color={style.color} roughness={0.35} metalness={0.1} />
              </mesh>
              {toggles.labels && (
                <Html distanceFactor={10} center>
                  <span className="pointer-events-none select-none rounded bg-obsidian-950/80 px-1 py-0.5 font-mono text-[9px] text-white">
                    {atom.element}
                  </span>
                </Html>
              )}
            </group>
          );
        })}

      {toggles.bonds &&
        bonds.map((bond) => {
          const midpoint: [number, number, number] = [
            (bond.from[0] + bond.to[0]) / 2,
            (bond.from[1] + bond.to[1]) / 2,
            (bond.from[2] + bond.to[2]) / 2
          ];
          const dx = bond.to[0] - bond.from[0];
          const dy = bond.to[1] - bond.from[1];
          const dz = bond.to[2] - bond.from[2];
          const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const direction = new THREE.Vector3(dx / length, dy / length, dz / length);
          // Orient a thin cylinder from `from` to `to` by rotating the default
          // (Y-up) cylinder axis onto the bond direction.
          const quaternion = new THREE.Quaternion().setFromUnitVectors(UP_AXIS, direction);
          return (
            <mesh key={bond.key} position={midpoint} quaternion={quaternion}>
              <cylinderGeometry args={[0.05, 0.05, length, 8]} />
              <meshStandardMaterial color="#9C97AE" roughness={0.6} />
            </mesh>
          );
        })}

      {toggles.unitCell && (
        <UnitCell edges={cellEdges} repeat={repeat} matrix={matrix} center={center} />
      )}
    </group>
  );
}

function ViewerLoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-slate-300">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amethyst-400 border-t-transparent" />
        <span className="font-mono text-xs">Построение решётки…</span>
      </div>
    </Html>
  );
}

export default function CrystalViewer({ structure, className }: CrystalViewerProps) {
  const [toggles, setToggles] = useState<ViewerToggles>({
    atoms: true,
    bonds: true,
    unitCell: true,
    labels: false
  });
  const [repeat, setRepeat] = useState<[number, number, number]>([1, 1, 1]);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const toggle = (key: keyof ViewerToggles) => setToggles((t) => ({ ...t, [key]: !t[key] }));

  const resetCamera = () => {
    controlsRef.current?.reset();
    setResetKey((k) => k + 1);
  };

  return (
    <div className={className}>
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-obsidian-950 sm:h-[520px]">
        <Canvas shadows dpr={[1, 2]} className="touch-none">
          <PerspectiveCamera makeDefault position={[6, 5, 8]} fov={45} key={resetKey} />
          <color attach="background" args={["#08070C"]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
          <directionalLight position={[-6, -3, -4]} intensity={0.3} color="#4C7FDB" />

          <Suspense fallback={<ViewerLoadingFallback />}>
            <LatticeScene structure={structure} repeat={repeat} toggles={toggles} />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={3}
            maxDistance={30}
            enableDamping
            dampingFactor={0.08}
            touches={{ ONE: 2 /* THREE.TOUCH.ROTATE */, TWO: 1 /* THREE.TOUCH.DOLLY_PAN mapped for pinch */ } as any}
          />
        </Canvas>

        {structure.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-full border border-citrine-400/40 bg-obsidian-900/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide text-citrine-400 backdrop-blur-sm">
            Модель условна — требуется CIF
          </span>
        )}

        <button
          onClick={resetCamera}
          className="absolute bottom-3 right-3 rounded-full border border-slate-900/10 bg-obsidian-900/85 px-3.5 py-2 text-xs font-medium text-parchment-50 backdrop-blur-sm transition-colors hover:border-amethyst-500/60 hover:text-amethyst-400"
          aria-label="Сбросить положение камеры"
        >
          ⟲ Сброс камеры
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["atoms", "Атомы"],
              ["bonds", "Связи"],
              ["unitCell", "Ячейка"],
              ["labels", "Подписи"]
            ] as [keyof ViewerToggles, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              aria-pressed={toggles[key]}
              className={`min-w-[88px] rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                toggles[key]
                  ? "border-amethyst-500 bg-amethyst-500/15 text-amethyst-400"
                  : "border-slate-200 text-parchment-400 hover:border-slate-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-parchment-400">Повтор решётки:</span>
          <div className="flex gap-1.5">
            {REPEAT_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setRepeat(opt.value)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[0.7rem] transition-colors ${
                  repeat.join() === opt.value.join()
                    ? "border-malachite-400 bg-malachite-400/15 text-malachite-400"
                    : "border-slate-200 text-parchment-400 hover:border-slate-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-parchment-400">
        Вращайте структуру мышью или пальцем, сжимайте пальцы для масштабирования.
      </p>
    </div>
  );
}
