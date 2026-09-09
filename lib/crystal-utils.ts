import type { AtomSite, BondSpec, CrystalStructure, ElementSymbol, UnitCellParams } from "./types";

/** Visual convention for each element: sphere color + relative radius.
 * Radii are NOT physically exact van-der-Waals radii — they're tuned so the
 * lattice reads clearly on a phone screen. Colors are configurable here in
 * one place, per the brief's "make colors configurable" requirement. */
export const ELEMENT_STYLE: Record<ElementSymbol, { color: string; radius: number; nameRu: string }> = {
  O: { color: "#E5484D", radius: 0.34, nameRu: "Кислород" },
  Si: { color: "#E9C46A", radius: 0.32, nameRu: "Кремний" },
  Al: { color: "#B197E8", radius: 0.34, nameRu: "Алюминий" },
  Be: { color: "#5FB98C", radius: 0.28, nameRu: "Бериллий" },
  Ca: { color: "#F4A05C", radius: 0.42, nameRu: "Кальций" },
  Fe: { color: "#C97A4A", radius: 0.4, nameRu: "Железо" },
  Ti: { color: "#9AA5B1", radius: 0.38, nameRu: "Титан" },
  K: { color: "#7C6FE0", radius: 0.48, nameRu: "Калий" },
  Na: { color: "#5B8DEF", radius: 0.4, nameRu: "Натрий" },
  H: { color: "#F3F1F8", radius: 0.18, nameRu: "Водород" },
  F: { color: "#8FD9B6", radius: 0.3, nameRu: "Фтор" },
  Cl: { color: "#7BC96F", radius: 0.36, nameRu: "Хлор" },
  Sr: { color: "#D98BD0", radius: 0.46, nameRu: "Стронций" },
  Mn: { color: "#B98BD9", radius: 0.38, nameRu: "Марганец" },
  Zr: { color: "#6FB6C9", radius: 0.4, nameRu: "Цирконий" }
};

const FALLBACK_STYLE = { color: "#9C97AE", radius: 0.32, nameRu: "?" };

export function styleForElement(el: ElementSymbol) {
  return ELEMENT_STYLE[el] ?? FALLBACK_STYLE;
}

/** Builds the 3x3 lattice matrix (columns = a, b, c vectors in Cartesian
 * space) from CIF-style cell parameters. Standard crystallographic
 * convention: a along x, b in the xy-plane, c completes the set. */
export function cellToCartesianMatrix(cell: UnitCellParams): number[][] {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const alpha = toRad(cell.alpha);
  const beta = toRad(cell.beta);
  const gamma = toRad(cell.gamma);

  const ax = cell.a;
  const ay = 0;
  const az = 0;

  const bx = cell.b * Math.cos(gamma);
  const by = cell.b * Math.sin(gamma);
  const bz = 0;

  const cx = cell.c * Math.cos(beta);
  const cy =
    (cell.c * (Math.cos(alpha) - Math.cos(beta) * Math.cos(gamma))) /
    Math.max(Math.sin(gamma), 1e-6);
  const czSquared = cell.c * cell.c - cx * cx - cy * cy;
  const cz = Math.sqrt(Math.max(czSquared, 0));

  return [
    [ax, ay, az],
    [bx, by, bz],
    [cx, cy, cz]
  ];
}

function fractionalToCartesian(frac: [number, number, number], m: number[][]): [number, number, number] {
  const [a, b, c] = m;
  const x = frac[0] * a[0] + frac[1] * b[0] + frac[2] * c[0];
  const y = frac[0] * a[1] + frac[1] * b[1] + frac[2] * c[1];
  const z = frac[0] * a[2] + frac[1] * b[2] + frac[2] * c[2];
  return [x, y, z];
}

export interface RenderAtom {
  key: string;
  element: ElementSymbol;
  position: [number, number, number]; // Cartesian, centered
  cellIndex: [number, number, number];
}

export interface RenderBond {
  key: string;
  from: [number, number, number];
  to: [number, number, number];
}

/** Expands the asymmetric unit into an N×N×N block of repeated unit cells,
 * converts every site to Cartesian coordinates, and re-centers the whole
 * lattice on the origin so orbit controls target something sensible. */
export function buildLattice(structure: CrystalStructure, repeat: [number, number, number]) {
  const matrix = cellToCartesianMatrix(structure.cell);
  const [nx, ny, nz] = repeat;

  const atoms: RenderAtom[] = [];
  for (let ix = 0; ix < nx; ix++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let iz = 0; iz < nz; iz++) {
        structure.atoms.forEach((site: AtomSite, i: number) => {
          const frac: [number, number, number] = [
            site.fractional[0] + ix,
            site.fractional[1] + iy,
            site.fractional[2] + iz
          ];
          const cart = fractionalToCartesian(frac, matrix);
          atoms.push({
            key: `${ix}-${iy}-${iz}-${i}`,
            element: site.element,
            position: cart,
            cellIndex: [ix, iy, iz]
          });
        });
      }
    }
  }

  // Center the lattice: shift by half the total extent along each lattice vector.
  const center = fractionalToCartesian([nx / 2, ny / 2, nz / 2], matrix);
  const centeredAtoms = atoms.map((a) => ({
    ...a,
    position: [
      a.position[0] - center[0],
      a.position[1] - center[1],
      a.position[2] - center[2]
    ] as [number, number, number]
  }));

  // Bonds: use explicit bonds within the base cell (index-based), replicated
  // per cell offset. If no bonds are declared, infer short contacts (< 2.2 Å)
  // between non-oxygen and oxygen sites as a reasonable visual default.
  const bonds: RenderBond[] = [];
  const declared: BondSpec[] = structure.bonds ?? inferBonds(structure);

  for (let ix = 0; ix < nx; ix++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let iz = 0; iz < nz; iz++) {
        declared.forEach((bond, bi) => {
          const fromSite = structure.atoms[bond.fromIndex];
          const toSite = structure.atoms[bond.toIndex];
          if (!fromSite || !toSite) return;
          const fromFrac: [number, number, number] = [
            fromSite.fractional[0] + ix,
            fromSite.fractional[1] + iy,
            fromSite.fractional[2] + iz
          ];
          const toFrac: [number, number, number] = [
            toSite.fractional[0] + ix,
            toSite.fractional[1] + iy,
            toSite.fractional[2] + iz
          ];
          const fromCart = fractionalToCartesian(fromFrac, matrix);
          const toCart = fractionalToCartesian(toFrac, matrix);
          bonds.push({
            key: `${ix}-${iy}-${iz}-${bi}`,
            from: [fromCart[0] - center[0], fromCart[1] - center[1], fromCart[2] - center[2]],
            to: [toCart[0] - center[0], toCart[1] - center[1], toCart[2] - center[2]]
          });
        });
      }
    }
  }

  // Unit cell wireframe corners (Cartesian, centered) for the first cell only —
  // UnitCell.tsx draws one wireframe box per repeated cell using these edges.
  const cellEdges = unitCellEdges(matrix);

  return { atoms: centeredAtoms, bonds, matrix, cellEdges, center };
}

/** Distance-based bond inference for structures without explicit bond data.
 * This is a display heuristic, not a chemistry engine — good enough to show
 * "this is a connected framework" without claiming precise bond lengths. */
function inferBonds(structure: CrystalStructure): BondSpec[] {
  const matrix = cellToCartesianMatrix(structure.cell);
  const cart = structure.atoms.map((s) => fractionalToCartesian(s.fractional, matrix));
  const bonds: BondSpec[] = [];
  const maxBondLength = Math.max(structure.cell.a, structure.cell.b, structure.cell.c) * 0.22;

  for (let i = 0; i < cart.length; i++) {
    for (let j = i + 1; j < cart.length; j++) {
      const isOxygenPair =
        structure.atoms[i].element !== "O" && structure.atoms[j].element !== "O" &&
        !(structure.atoms[i].element === structure.atoms[j].element);
      const dx = cart[i][0] - cart[j][0];
      const dy = cart[i][1] - cart[j][1];
      const dz = cart[i][2] - cart[j][2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const oneIsOxygen = structure.atoms[i].element === "O" || structure.atoms[j].element === "O";
      if (oneIsOxygen && !isOxygenPair && dist > 0.01 && dist < maxBondLength) {
        bonds.push({ fromIndex: i, toIndex: j });
      }
    }
  }
  return bonds;
}

function unitCellEdges(matrix: number[][]): Array<[[number, number, number], [number, number, number]]> {
  const corners: [number, number, number][] = [];
  for (let i = 0; i <= 1; i++) {
    for (let j = 0; j <= 1; j++) {
      for (let k = 0; k <= 1; k++) {
        corners.push(fractionalToCartesian([i, j, k], matrix));
      }
    }
  }
  const idx = (i: number, j: number, k: number) => corners[i * 4 + j * 2 + k];
  const edges: Array<[[number, number, number], [number, number, number]]> = [];
  const pairs: Array<[[number, number, number], [number, number, number]]> = [
    [idx(0, 0, 0), idx(1, 0, 0)], [idx(0, 1, 0), idx(1, 1, 0)],
    [idx(0, 0, 1), idx(1, 0, 1)], [idx(0, 1, 1), idx(1, 1, 1)],
    [idx(0, 0, 0), idx(0, 1, 0)], [idx(1, 0, 0), idx(1, 1, 0)],
    [idx(0, 0, 1), idx(0, 1, 1)], [idx(1, 0, 1), idx(1, 1, 1)],
    [idx(0, 0, 0), idx(0, 0, 1)], [idx(1, 0, 0), idx(1, 0, 1)],
    [idx(0, 1, 0), idx(0, 1, 1)], [idx(1, 1, 0), idx(1, 1, 1)]
  ];
  edges.push(...pairs);
  return edges;
}
