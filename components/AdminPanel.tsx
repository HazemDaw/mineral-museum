"use client";

import { useState } from "react";
import type { Mineral } from "@/lib/types";

/**
 * Architectural placeholder for the museum staff's future editing tool.
 *
 * No authentication or persistence yet — per the brief, this prototype only
 * needs to demonstrate the data shape and the editing surface. Wiring this
 * to a real database means: (1) replace `initialMinerals` with a fetch from
 * the API route backed by the `Mineral` / `CrystalStructure` tables, and
 * (2) make `handleSave` call a real POST/PATCH endpoint instead of updating
 * local state.
 */
export default function AdminPanel({ initialMinerals }: { initialMinerals: Mineral[] }) {
  const [minerals, setMinerals] = useState(initialMinerals);
  const [selectedId, setSelectedId] = useState(initialMinerals[0]?.id ?? "");
  const [savedNotice, setSavedNotice] = useState(false);

  const selected = minerals.find((m) => m.id === selectedId);

  const updateField = <K extends keyof Mineral>(key: K, value: Mineral[K]) => {
    setMinerals((prev) => prev.map((m) => (m.id === selectedId ? { ...m, [key]: value } : m)));
  };

  const handleSave = () => {
    // Placeholder: in production this posts to `/api/minerals/[id]`.
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  if (!selected) return null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="glass-panel rounded-2xl p-3">
        <p className="label-eyebrow mb-2 px-2">Образцы</p>
        <ul className="flex flex-col gap-1">
          {minerals.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => setSelectedId(m.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  m.id === selectedId
                    ? "bg-amethyst-500/15 text-amethyst-400"
                    : "text-parchment-200 hover:bg-slate-100"
                }`}
              >
                {m.nameRu}
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled
          title="Доступно после подключения базы данных"
          className="mt-3 w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-parchment-400"
        >
          + Добавить минерал
        </button>
      </aside>

      <section className="glass-panel flex flex-col gap-5 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-parchment-50">Редактирование: {selected.nameRu}</h2>
          {savedNotice && <span className="text-xs text-malachite-400">Сохранено (демо-режим)</span>}
        </div>

        <Field label="Русское название">
          <input
            value={selected.nameRu}
            onChange={(e) => updateField("nameRu", e.target.value)}
            className="admin-input"
          />
        </Field>

        <Field label="Химическая формула">
          <input
            value={selected.formula}
            onChange={(e) => updateField("formula", e.target.value)}
            className="admin-input font-mono"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Твёрдость">
            <input
              value={selected.hardness}
              onChange={(e) => updateField("hardness", e.target.value)}
              className="admin-input"
            />
          </Field>
          <Field label="Плотность">
            <input
              value={selected.density}
              onChange={(e) => updateField("density", e.target.value)}
              className="admin-input"
            />
          </Field>
        </div>

        <Field label="Описание">
          <textarea
            value={selected.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            className="admin-input resize-none"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Фото образца (реальное)">
            <div className="flex items-center gap-2">
              <input value={selected.specimenImage} readOnly className="admin-input" />
              <button
                disabled
                title="Загрузка файлов будет доступна после подключения хранилища"
                className="shrink-0 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-parchment-400"
              >
                Загрузить
              </button>
            </div>
          </Field>
          <Field label="CIF-файл структуры">
            <div className="flex items-center gap-2">
              <input
                value={selected.cifFile ?? "не загружен"}
                readOnly
                className="admin-input text-parchment-400"
              />
              <button
                disabled
                title="Импорт CIF будет доступен в следующей версии"
                className="shrink-0 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-parchment-400"
              >
                Импорт
              </button>
            </div>
          </Field>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button
            onClick={handleSave}
            className="rounded-full bg-amethyst-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amethyst-600"
          >
            Сохранить изменения
          </button>
        </div>
      </section>

      <style>{`
        .admin-input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          padding: 0.55rem 0.75rem;
          font-size: 0.875rem;
          color: #101826;
        }
        .admin-input:focus { outline: 2px solid #1E4690; outline-offset: 1px; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.68rem] uppercase tracking-wider text-parchment-400">{label}</span>
      {children}
    </label>
  );
}
