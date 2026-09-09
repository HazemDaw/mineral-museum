"use client";

import type { CrystalSystem } from "@/lib/types";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  activeSystem: CrystalSystem | "all";
  onSystemChange: (value: CrystalSystem | "all") => void;
  availableSystems: { value: CrystalSystem; label: string }[];
}

export default function SearchBar({
  query,
  onQueryChange,
  activeSystem,
  onSystemChange,
  availableSystems
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Найти образец по названию или формуле"
          className="w-full rounded-full border border-slate-200 bg-obsidian-800 py-2.5 pl-9 pr-4 text-sm text-parchment-50 placeholder:text-parchment-400 focus:border-amethyst-500 focus:outline-none"
          aria-label="Поиск минерала"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по сингонии">
        <button
          onClick={() => onSystemChange("all")}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
            activeSystem === "all"
              ? "border-amethyst-500 bg-amethyst-500/15 text-amethyst-400"
              : "border-slate-200 text-parchment-400 hover:border-slate-300 hover:text-parchment-200"
          }`}
        >
          Все сингонии
        </button>
        {availableSystems.map((sys) => (
          <button
            key={sys.value}
            onClick={() => onSystemChange(sys.value)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeSystem === sys.value
                ? "border-amethyst-500 bg-amethyst-500/15 text-amethyst-400"
                : "border-slate-200 text-parchment-400 hover:border-slate-300 hover:text-parchment-200"
            }`}
          >
            {sys.label}
          </button>
        ))}
      </div>
    </div>
  );
}
