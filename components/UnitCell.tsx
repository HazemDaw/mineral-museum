"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface UnitCellProps {
  /** Edges of a single unit cell, in centered Cartesian coordinates. */
  edges: Array<[[number, number, number], [number, number, number]]>;
  /** How many repeated cells to draw the wireframe for, along each axis. */
  repeat: [number, number, number];
  /** The a/b/c lattice vectors (from crystal-utils' cellToCartesianMatrix),
   * used to translate the base wireframe across the repeated block. */
  matrix: number[][];
  center: [number, number, number];
  color?: string;
}

/** Default wireframe color — the university's navy accent, kept bright
 * enough to read clearly against the viewer's dark display-case canvas. */
const DEFAULT_WIREFRAME_COLOR = "#4C7FDB";

/** Renders one thin wireframe box per repeated unit cell — this is what lets
 * a student see "the crystal is this box, repeated," not just a cloud of
 * atoms. Kept as its own component so it can be toggled independently. */
export default function UnitCell({ edges, repeat, matrix, center, color = DEFAULT_WIREFRAME_COLOR }: UnitCellProps) {
  const [nx, ny, nz] = repeat;

  const lineSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
        for (let iz = 0; iz < nz; iz++) {
          const offset = [
            ix * matrix[0][0] + iy * matrix[1][0] + iz * matrix[2][0] - center[0],
            ix * matrix[0][1] + iy * matrix[1][1] + iz * matrix[2][1] - center[1],
            ix * matrix[0][2] + iy * matrix[1][2] + iz * matrix[2][2] - center[2]
          ];
          edges.forEach(([a, b]) => {
            points.push(new THREE.Vector3(a[0] + offset[0], a[1] + offset[1], a[2] + offset[2]));
            points.push(new THREE.Vector3(b[0] + offset[0], b[1] + offset[1], b[2] + offset[2]));
          });
        }
      }
    }
    return points;
  }, [edges, matrix, nx, ny, nz, center]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(lineSegments), [lineSegments]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.55} />
    </lineSegments>
  );
}
