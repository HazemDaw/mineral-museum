import type { ElementSymbol } from "@/lib/types";
import { styleForElement } from "@/lib/crystal-utils";

export default function AtomLegend({ elements }: { elements: ElementSymbol[] }) {
  return (
    <div>
      <h4 className="label-eyebrow mb-3">Элементы структуры</h4>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {elements.map((el) => {
          const style = styleForElement(el);
          return (
            <li key={el} className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-slate-900/10"
                style={{ backgroundColor: style.color }}
                aria-hidden
              />
              <span className="font-mono text-sm text-parchment-50">{el}</span>
              <span className="text-xs text-parchment-400">{style.nameRu}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
