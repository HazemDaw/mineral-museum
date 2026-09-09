// ---------------------------------------------------------------------------
// Core data model.
//
// This mirrors the future database schema on purpose (see README.md → DATABASE).
// Nothing about a mineral is hardcoded into a UI component — every page reads
// from this shape, so swapping the in-memory array in `lib/minerals-data.ts`
// for a real database (Postgres/Prisma, etc.) later requires no UI changes.
// ---------------------------------------------------------------------------

/** Crystal systems (сингонии). Kept as a union so CrystalViewer can branch
 * on symmetry-relevant behaviour (e.g. hexagonal vs. triclinic cell shapes). */
export type CrystalSystem =
  | "triclinic" // триклинная
  | "monoclinic" // моноклинная
  | "orthorhombic" // ромбическая
  | "tetragonal" // тетрагональная
  | "trigonal" // тригональная
  | "hexagonal" // гексагональная
  | "cubic"; // кубическая

/** Unit cell parameters. Angles in degrees, edge lengths in Å.
 * This is exactly the shape a CIF parser (`_cell_length_a`, `_cell_angle_alpha`,
 * etc.) will eventually populate — see `lib/crystal-utils.ts`. */
export interface UnitCellParams {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
}

/** One atomic site in the asymmetric unit, given in fractional coordinates
 * (0..1 along each cell axis) exactly as a CIF `_atom_site_fract_*` loop
 * would provide. `occupancy` and `label` are optional CIF-style extras. */
export interface AtomSite {
  element: ElementSymbol;
  label?: string;
  fractional: [number, number, number];
  occupancy?: number;
}

/** A bond declared between two atom sites, by index into `atoms`.
 * Optional — if omitted, CrystalViewer can infer bonds heuristically by
 * distance, but explicit bonds (as CIF/COD `_geom_bond` data would give us)
 * are preferred once real structures are wired in. */
export interface BondSpec {
  fromIndex: number;
  toIndex: number;
}

/** Chemical elements we currently render with a distinct legend color.
 * Extend freely — `lib/crystal-utils.ts` falls back to a neutral color for
 * anything not listed here so unknown elements never crash the viewer. */
export type ElementSymbol =
  | "K" | "Na" | "Fe" | "Ti" | "Si" | "O" | "H" | "F" | "Cl"
  | "Sr" | "Ca" | "Mn" | "Zr" | "Be" | "Al";

/** Full crystal-structure record for one mineral. This is deliberately the
 * same shape described in the project brief under "CRYSTAL STRUCTURE
 * ARCHITECTURE" — a future CIF import pipeline produces exactly this object. */
export interface CrystalStructure {
  mineralId: string;
  crystalSystem: CrystalSystem;
  spaceGroup: string;
  cell: UnitCellParams;
  atoms: AtomSite[];
  bonds?: BondSpec[];
  /** Marks structures that are illustrative placeholders (not yet sourced
   * from a verified CIF file) so the UI can show a "модель условна" note. */
  isPlaceholder: boolean;
  /** Free-text provenance, e.g. "COD 9001234" once a real CIF is linked. */
  source?: string;
}

/** A mineral catalog record. */
export interface Mineral {
  id: string;
  slug: string;
  nameRu: string;
  formula: string;
  crystalSystem: CrystalSystem;
  crystalSystemRu: string;
  spaceGroup?: string;
  hardness: string; // kept as a display string ("3–3,5") rather than a number
  density: string; // e.g. "3,3 г/см³"
  color?: string;
  occurrenceNote?: string;
  description: string;
  /** Real photo of the physical specimen, e.g. "/specimens/astrofillit.jpg".
   * The file doesn't need to exist yet — <SpecimenImage> falls back to
   * `specimenImagePlaceholder` automatically until the museum drops the
   * real photo into `public/specimens/` under this exact filename. */
  specimenImage: string;
  /** Illustrative placeholder shown until the real photo above exists. */
  specimenImagePlaceholder: string;
  cifFile?: string; // path to a future CIF file, once available
  structure: CrystalStructure;
  /** Set when a label/scientific detail needs department confirmation,
   * per the brief's instruction never to silently invent data. */
  needsConfirmation?: string;
  createdAt: string;
  updatedAt: string;
}
