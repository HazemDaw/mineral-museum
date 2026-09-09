import type { Mineral } from "@/lib/types";

export default function MineralInfo({ mineral }: { mineral: Mineral }) {
  const facts: Array<{ label: string; value: string }> = [
    { label: "Сингония", value: mineral.crystalSystemRu },
    { label: "Твёрдость (шкала Мооса)", value: mineral.hardness },
    { label: "Плотность", value: mineral.density }
  ];
  if (mineral.color) facts.push({ label: "Цвет", value: mineral.color });
  if (mineral.occurrenceNote) facts.push({ label: "Совместное нахождение", value: mineral.occurrenceNote });
  if (mineral.structure.spaceGroup) facts.push({ label: "Пространственная группа", value: mineral.structure.spaceGroup });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-eyebrow">Химическая формула</p>
        <p className="mt-1 break-words font-mono text-lg text-parchment-50 sm:text-xl">{mineral.formula}</p>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-y border-slate-200 py-5 sm:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[0.68rem] uppercase tracking-wider text-parchment-400">{fact.label}</dt>
            <dd className="mt-1 font-mono text-sm text-citrine-400">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <p className="text-[15px] leading-relaxed text-parchment-200">{mineral.description}</p>

      {mineral.needsConfirmation && (
        <div className="rounded-xl border border-citrine-400/30 bg-citrine-400/[0.06] p-4">
          <p className="label-eyebrow !text-citrine-400">Требует подтверждения</p>
          <p className="mt-2 text-sm leading-relaxed text-parchment-200">{mineral.needsConfirmation}</p>
        </div>
      )}

      {mineral.structure.isPlaceholder && (
        <p className="text-xs italic text-parchment-400">
          Кристаллическая структура ниже — условная модель для прототипа, построенная по параметрам сингонии
          {mineral.structure.source ? `. ${mineral.structure.source}` : "."}
        </p>
      )}
    </div>
  );
}
