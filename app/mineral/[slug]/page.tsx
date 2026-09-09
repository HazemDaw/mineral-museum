import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getMineralBySlug } from "@/lib/minerals-data";
import MineralInfo from "@/components/MineralInfo";
import CrystalViewer from "@/components/CrystalViewer";
import AtomLegend from "@/components/AtomLegend";
import QRCode from "@/components/QRCode";
import SpecimenImage from "@/components/SpecimenImage";
import type { ElementSymbol } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const mineral = getMineralBySlug(params.slug);
  return { title: mineral ? `${mineral.nameRu} — Музей минералогии` : "Минерал не найден" };
}

export default function MineralPage({ params }: { params: { slug: string } }) {
  const mineral = getMineralBySlug(params.slug);
  if (!mineral) notFound();

  const uniqueElements = Array.from(new Set(mineral.structure.atoms.map((a) => a.element))) as ElementSymbol[];

  // Stable, printable URL — matches what the physical QR label under the
  // specimen encodes. Falls back to a relative path during local preview.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const pageUrl = `${baseUrl}/mineral/${mineral.slug}`;

  return (
    <main className="min-h-screen bg-specimen-grain pb-16">
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-parchment-400 transition-colors hover:text-amethyst-400"
        >
          <span aria-hidden>←</span> Вернуться к коллекции
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 pt-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-obsidian-950">
          <SpecimenImage
            src={mineral.specimenImage}
            placeholderSrc={mineral.specimenImagePlaceholder}
            alt={mineral.nameRu}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="label-eyebrow">{mineral.crystalSystemRu}</p>
            <h1 className="mt-2 font-display text-3xl font-medium text-parchment-50 sm:text-4xl">
              {mineral.nameRu}
            </h1>
          </div>
          <MineralInfo mineral={mineral} />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-5 sm:px-10">
        <p className="label-eyebrow">Кристаллическая структура</p>
        <h2 className="mt-2 font-display text-2xl text-parchment-50">Атомная решётка минерала</h2>
        <p className="mt-2 max-w-2xl text-sm text-parchment-200">
          Вращайте модель, чтобы рассмотреть повторяющуюся элементарную ячейку и расположение атомов.
          Используйте переключатели под визуализацией, чтобы показать или скрыть атомы, связи и ячейку.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <CrystalViewer structure={mineral.structure} />

          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-2xl p-5">
              <AtomLegend elements={uniqueElements} />
            </div>
            <QRCode url={pageUrl} mineralNameRu={mineral.nameRu} />
          </div>
        </div>
      </section>
    </main>
  );
}
