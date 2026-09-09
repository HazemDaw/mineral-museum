import { minerals } from "@/lib/minerals-data";
import MineralCatalog from "@/components/MineralCatalog";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-specimen-grain">
      <header className="border-b border-slate-200 px-5 pb-10 pt-14 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="label-eyebrow">Кафедра геологии</p>
          <h1 className="mt-3 font-display text-3xl font-medium leading-tight text-parchment-50 sm:text-5xl">
            Музей минералогии и петрографии
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] text-parchment-200 sm:text-base">
            Интерактивная минералогическая коллекция. Наведите камеру телефона на QR-код рядом с
            образцом или выберите минерал из каталога ниже, чтобы изучить его кристаллическую структуру.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-10">
        <MineralCatalog minerals={minerals} />
      </section>

      <footer className="border-t border-slate-200 px-5 py-8 text-center text-xs text-parchment-400 sm:px-10">
        Прототип сайта музея — кафедра геологии, {new Date().getFullYear()}
      </footer>
    </main>
  );
}
