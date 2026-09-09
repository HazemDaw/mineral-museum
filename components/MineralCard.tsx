import Link from "next/link";
import type { Mineral } from "@/lib/types";
import SpecimenImage from "./SpecimenImage";

export default function MineralCard({ mineral }: { mineral: Mineral }) {
  return (
    <Link
      href={`/mineral/${mineral.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-obsidian-800 transition-all hover:-translate-y-1 hover:border-amethyst-500/40 hover:shadow-glass"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-950">
        <SpecimenImage
          src={mineral.specimenImage}
          placeholderSrc={mineral.specimenImagePlaceholder}
          alt={mineral.nameRu}
          className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-slate-900/10 bg-obsidian-900/85 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-parchment-200 backdrop-blur-sm">
          {mineral.crystalSystemRu}
        </span>
        {mineral.needsConfirmation && (
          <span className="absolute right-3 top-3 rounded-full border border-citrine-400/40 bg-obsidian-900/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-citrine-400 backdrop-blur-sm">
            Требует подтверждения
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-medium text-parchment-50">{mineral.nameRu}</h3>
          <p className="mt-1 truncate font-mono text-xs text-parchment-400" title={mineral.formula}>
            {mineral.formula}
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-200 pt-3">
          <div className="stat-chip">
            <span className="text-[0.65rem] uppercase tracking-wider text-parchment-400">Твёрдость</span>
            <span className="font-mono text-sm text-citrine-400">{mineral.hardness}</span>
          </div>
          <div className="stat-chip">
            <span className="text-[0.65rem] uppercase tracking-wider text-parchment-400">Плотность</span>
            <span className="font-mono text-sm text-citrine-400">{mineral.density}</span>
          </div>
        </div>

        <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-amethyst-400 transition-transform group-hover:translate-x-0.5">
          Подробнее <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
