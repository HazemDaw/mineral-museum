import type { CrystalStructure, Mineral } from "./types";

const NOW = "2026-08-26T00:00:00.000Z";

/** Placeholder disclaimer reused across every structure below — every one of
 * these is a stand-in for a real CIF import, per the brief's instruction to
 * never silently invent verified crystallography. */
const PLACEHOLDER_NOTE =
  "Условная демонстрационная модель, построена по параметрам сингонии для прототипа. Подлежит замене реальными координатами после загрузки CIF-файла.";

// ---------------------------------------------------------------------------
// АСТРОФИЛЛИТ — triclinic
// ---------------------------------------------------------------------------
const astrofillitStructure: CrystalStructure = {
  mineralId: "astrofillit",
  crystalSystem: "triclinic",
  spaceGroup: "P1̄ (условно)",
  cell: { a: 5.37, b: 11.9, c: 11.66, alpha: 113.6, beta: 94.9, gamma: 103.4 },
  isPlaceholder: true,
  source: PLACEHOLDER_NOTE,
  atoms: [
    { element: "K", fractional: [0.0, 0.0, 0.0] },
    { element: "Na", fractional: [0.5, 0.0, 0.0] },
    { element: "Fe", fractional: [0.2, 0.25, 0.1] },
    { element: "Fe", fractional: [0.8, 0.25, 0.1] },
    { element: "Fe", fractional: [0.2, 0.75, 0.1] },
    { element: "Ti", fractional: [0.35, 0.15, 0.4] },
    { element: "Ti", fractional: [0.65, 0.85, 0.6] },
    { element: "Si", fractional: [0.15, 0.4, 0.3] },
    { element: "Si", fractional: [0.45, 0.4, 0.3] },
    { element: "Si", fractional: [0.15, 0.6, 0.7] },
    { element: "Si", fractional: [0.45, 0.6, 0.7] },
    { element: "O", fractional: [0.1, 0.45, 0.35] },
    { element: "O", fractional: [0.5, 0.45, 0.35] },
    { element: "O", fractional: [0.3, 0.35, 0.25] },
    { element: "O", fractional: [0.1, 0.65, 0.75] },
    { element: "O", fractional: [0.5, 0.65, 0.75] },
    { element: "F", fractional: [0.6, 0.1, 0.5] },
    { element: "O", fractional: [0.75, 0.3, 0.55] },
    { element: "O", fractional: [0.25, 0.55, 0.15] }
  ]
};

// ---------------------------------------------------------------------------
// ЛАМПРОФИЛЛИТ — monoclinic
// ---------------------------------------------------------------------------
const lamprofillitStructure: CrystalStructure = {
  mineralId: "lamprofillit",
  crystalSystem: "monoclinic",
  spaceGroup: "P21/m (условно)",
  cell: { a: 5.4, b: 7.05, c: 11.9, alpha: 90, beta: 96.4, gamma: 90 },
  isPlaceholder: true,
  source: PLACEHOLDER_NOTE,
  atoms: [
    { element: "Na", fractional: [0.0, 0.0, 0.0] },
    { element: "Na", fractional: [0.5, 0.0, 0.0] },
    { element: "Na", fractional: [0.0, 0.5, 0.2] },
    { element: "Sr", fractional: [0.25, 0.25, 0.1] },
    { element: "Ti", fractional: [0.15, 0.6, 0.3] },
    { element: "Ti", fractional: [0.55, 0.6, 0.3] },
    { element: "Ti", fractional: [0.35, 0.9, 0.5] },
    { element: "Si", fractional: [0.1, 0.35, 0.45] },
    { element: "Si", fractional: [0.4, 0.35, 0.45] },
    { element: "Si", fractional: [0.1, 0.15, 0.65] },
    { element: "Si", fractional: [0.4, 0.15, 0.65] },
    { element: "O", fractional: [0.05, 0.4, 0.5] },
    { element: "O", fractional: [0.45, 0.4, 0.5] },
    { element: "O", fractional: [0.25, 0.25, 0.55] },
    { element: "O", fractional: [0.05, 0.2, 0.7] },
    { element: "O", fractional: [0.45, 0.2, 0.7] },
    { element: "O", fractional: [0.6, 0.7, 0.35] },
    { element: "O", fractional: [0.2, 0.8, 0.2] }
  ]
};

// ---------------------------------------------------------------------------
// ЭВДИАЛИТ — trigonal
// ---------------------------------------------------------------------------
const evdialitStructure: CrystalStructure = {
  mineralId: "evdialit",
  crystalSystem: "trigonal",
  spaceGroup: "R3̄m (условно)",
  cell: { a: 14.2, b: 14.2, c: 30.2, alpha: 90, beta: 90, gamma: 120 },
  isPlaceholder: true,
  source: PLACEHOLDER_NOTE,
  atoms: [
    { element: "Na", fractional: [0.0, 0.0, 0.0] },
    { element: "Na", fractional: [0.33, 0.0, 0.05] },
    { element: "Na", fractional: [0.66, 0.0, 0.1] },
    { element: "Na", fractional: [0.0, 0.33, 0.15] },
    { element: "Ca", fractional: [0.2, 0.2, 0.2] },
    { element: "Ca", fractional: [0.8, 0.2, 0.2] },
    { element: "Fe", fractional: [0.5, 0.5, 0.25] },
    { element: "Mn", fractional: [0.1, 0.5, 0.3] },
    { element: "Zr", fractional: [0.15, 0.15, 0.35] },
    { element: "Zr", fractional: [0.85, 0.15, 0.35] },
    { element: "Zr", fractional: [0.15, 0.85, 0.35] },
    { element: "Si", fractional: [0.3, 0.1, 0.45] },
    { element: "Si", fractional: [0.1, 0.3, 0.45] },
    { element: "Si", fractional: [0.6, 0.4, 0.5] },
    { element: "Si", fractional: [0.4, 0.6, 0.5] },
    { element: "O", fractional: [0.25, 0.05, 0.48] },
    { element: "O", fractional: [0.05, 0.25, 0.48] },
    { element: "O", fractional: [0.55, 0.35, 0.53] },
    { element: "O", fractional: [0.35, 0.55, 0.53] },
    { element: "O", fractional: [0.2, 0.4, 0.4] },
    { element: "Cl", fractional: [0.5, 0.0, 0.6] }
  ]
};

// ---------------------------------------------------------------------------
// БЕРИЛЛ (зелёный / голубой=аквамарин) — hexagonal
// Real published lattice constants for beryl (a ≈ 9.21 Å, c ≈ 9.19 Å) are
// used here since they're well established; the atom basis below is a
// simplified illustrative ring arrangement (beryl's real Si6O18 ring
// structure), not the full refined coordinate set.
// ---------------------------------------------------------------------------
function berylStructure(mineralId: string): CrystalStructure {
  const ring = (radius: number, count: number, z: number, element: "Si" | "O") => {
    const sites = [];
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / count;
      sites.push({
        element,
        fractional: [0.5 + radius * Math.cos(theta), 0.5 + radius * Math.sin(theta), z] as [number, number, number]
      });
    }
    return sites;
  };

  return {
    mineralId,
    crystalSystem: "hexagonal",
    spaceGroup: "P6/mcc (справочное значение)",
    cell: { a: 9.21, b: 9.21, c: 9.19, alpha: 90, beta: 90, gamma: 120 },
    isPlaceholder: true,
    source:
      "Параметры ячейки соответствуют справочным данным для берилла; расположение атомов упрощено для наглядности. " + PLACEHOLDER_NOTE,
    atoms: [
      { element: "Al", fractional: [0.5, 0.5, 0.25] },
      { element: "Al", fractional: [0.5, 0.5, 0.75] },
      { element: "Be", fractional: [0.2, 0.5, 0.0] },
      { element: "Be", fractional: [0.8, 0.5, 0.0] },
      { element: "Be", fractional: [0.5, 0.2, 0.5] },
      ...ring(0.3, 6, 0.25, "Si"),
      ...ring(0.3, 6, 0.75, "Si"),
      ...ring(0.42, 6, 0.2, "O"),
      ...ring(0.42, 6, 0.3, "O"),
      ...ring(0.42, 6, 0.7, "O"),
      ...ring(0.42, 6, 0.8, "O")
    ]
  };
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------
export const minerals: Mineral[] = [
  {
    id: "astrofillit",
    slug: "astrofillit",
    nameRu: "Астрофиллит",
    formula: "K₂NaFe²⁺₇Ti₂(Si₄O₁₂)₂O₂(OH)₄F",
    crystalSystem: "triclinic",
    crystalSystemRu: "Триклинная сингония",
    hardness: "3–3,5",
    density: "3,3 г/см³",
    description:
      "Астрофиллит образует тонкие звездчатые сростки золотисто-бронзовых пластинчатых кристаллов, характерные для щелочных пегматитов. Название происходит от греч. «astron» — звезда и «phyllon» — лист, из-за характерной звездчатой отдельности агрегатов.",
    specimenImage: "/specimens/astrofillit.png",
    specimenImagePlaceholder: "/specimens/astrofillit.png",
    structure: astrofillitStructure,
    createdAt: NOW,
    updatedAt: NOW
  },
  {
    id: "lamprofillit",
    slug: "lamprofillit",
    nameRu: "Лампрофиллит",
    formula: "Na₃(SrNa)Ti₃(Si₂O₇)₂O₂(OH)₂",
    crystalSystem: "monoclinic",
    crystalSystemRu: "Моноклинная сингония",
    hardness: "3",
    density: "3,5 г/см³",
    occurrenceNote: "В пегматите",
    description:
      "Лампрофиллит — титаносиликат группы астрофиллита, встречающийся в виде удлинённых пластинчатых кристаллов янтарного цвета в нефелин-сиенитовых пегматитах.",
    specimenImage: "/specimens/lamprofillit.png",
    specimenImagePlaceholder: "/specimens/lamprofillit.png",
    structure: lamprofillitStructure,
    createdAt: NOW,
    updatedAt: NOW
  },
  {
    id: "evdialit",
    slug: "evdialit",
    nameRu: "Эвдиалит",
    formula: "Na₁₅Ca₆(Fe,Mn)₃Zr₃SiO(O,OH,H₂O)₃(Si₃O₉)₂(Si₉O₂₇)₂(OH,Cl)₂",
    crystalSystem: "trigonal",
    crystalSystemRu: "Тригональная сингония",
    hardness: "5–6",
    density: "2,7–3,1 г/см³",
    occurrenceNote: "С диоптазом",
    description:
      "Эвдиалит — цирконосиликат сложного состава, часто малиново-красного цвета («саамская кровь»), типичный минерал агпаитовых нефелин-сиенитов и пегматитов.",
    specimenImage: "/specimens/evdialit.jpg",
    specimenImagePlaceholder: "/specimens/evdialit.png",
    structure: evdialitStructure,
    createdAt: NOW,
    updatedAt: NOW
  },
  {
    id: "beryl-green",
    slug: "beryll-green",
    nameRu: "Берилл зелёный",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "hexagonal",
    crystalSystemRu: "Гексагональная сингония",
    hardness: "7,5–8",
    density: "2,63–2,92 г/см³",
    color: "Зелёный",
    description:
      "Берилл — циклосиликат бериллия и алюминия, кристаллизующийся в виде шестигранных призм. Зелёная окраска этой разновидности связана с примесью хрома или ванадия.",
    specimenImage: "/specimens/beryll-green.png",
    specimenImagePlaceholder: "/specimens/beryll-green.png",
    structure: berylStructure("beryl-green"),
    needsConfirmation:
      "Оригинальная этикетка образца содержит формулировку «Хризоберилл зелёный БЕРИЛЛ». Хризоберилл (BeAl₂O₄, ромбическая сингония) и берилл (Be₃Al₂Si₆O₁₈, гексагональная сингония) — разные минералы. Поскольку этикетка указывает «Гекс. синг.», для прототипа принят берилл. Требует подтверждения кафедрой геологии.",
    createdAt: NOW,
    updatedAt: NOW
  },
  {
    id: "aquamarine",
    slug: "aquamarine",
    nameRu: "Аквамарин",
    formula: "Be₃Al₂Si₆O₁₈",
    crystalSystem: "hexagonal",
    crystalSystemRu: "Гексагональная сингония",
    hardness: "7,5–8",
    density: "2,63–2,92 г/см³",
    color: "Голубой",
    description: "Голубая разновидность берилла. Окраска обусловлена примесью двухвалентного и трёхвалентного железа.",
    specimenImage: "/specimens/aquamarine.png",
    specimenImagePlaceholder: "/specimens/aquamarine.png",
    structure: berylStructure("aquamarine"),
    createdAt: NOW,
    updatedAt: NOW
  }
];

export function getMineralBySlug(slug: string): Mineral | undefined {
  return minerals.find((m) => m.slug === slug);
}

export function getAllSlugs(): string[] {
  return minerals.map((m) => m.slug);
}
