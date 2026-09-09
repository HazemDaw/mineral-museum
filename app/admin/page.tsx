import Link from "next/link";
import { minerals } from "@/lib/minerals-data";
import AdminPanel from "@/components/AdminPanel";

export const metadata = { title: "Панель музея — Музей минералогии" };

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-specimen-grain px-5 py-10 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-parchment-400 transition-colors hover:text-amethyst-400">
          ← Вернуться к коллекции
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="label-eyebrow">Для сотрудников музея</p>
            <h1 className="mt-2 font-display text-2xl text-parchment-50 sm:text-3xl">Панель управления коллекцией</h1>
          </div>
          <span className="rounded-full border border-citrine-400/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-citrine-400">
            Прототип, без авторизации
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-parchment-200">
          Черновой интерфейс редактирования данных. В демо-режиме изменения не сохраняются на сервере —
          архитектура готова для подключения авторизации и базы данных на следующем этапе.
        </p>

        <div className="mt-8">
          <AdminPanel initialMinerals={minerals} />
        </div>
      </div>
    </main>
  );
}
