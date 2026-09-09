"use client";

import { useMemo, useState } from "react";
import type { CrystalSystem, Mineral } from "@/lib/types";
import MineralCard from "./MineralCard";
import SearchBar from "./SearchBar";

const SYSTEM_LABELS: Record<CrystalSystem, string> = {
  triclinic: "Триклинная",
  monoclinic: "Моноклинная",
  orthorhombic: "Ромбическая",
  tetragonal: "Тетрагональная",
  trigonal: "Тригональная",
  hexagonal: "Гексагональная",
  cubic: "Кубическая"
};

export default function MineralCatalog({ minerals }: { minerals: Mineral[] }) {
  const [query, setQuery] = useState("");
  const [system, setSystem] = useState<CrystalSystem | "all">("all");

  const availableSystems = useMemo(() => {
    const set = new Set(minerals.map((m) => m.crystalSystem));
    return Array.from(set).map((value) => ({ value, label: SYSTEM_LABELS[value] }));
  }, [minerals]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return minerals.filter((m) => {
      const matchesSystem = system === "all" || m.crystalSystem === system;
      const matchesQuery =
        q.length === 0 ||
        m.nameRu.toLowerCase().includes(q) ||
        m.formula.toLowerCase().includes(q);
      return matchesSystem && matchesQuery;
    });
  }, [minerals, query, system]);

  return (
    <div className="flex flex-col gap-6">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        activeSystem={system}
        onSystemChange={setSystem}
        availableSystems={availableSystems}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-parchment-400">
          Ничего не найдено. Попробуйте изменить запрос или сбросить фильтр.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mineral) => (
            <MineralCard key={mineral.id} mineral={mineral} />
          ))}
        </div>
      )}
    </div>
  );
}
