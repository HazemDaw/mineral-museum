"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface QRCodeProps {
  /** Stable page URL — the QR encodes ONLY this, never mineral data, so
   * museum staff can update specimen info without reprinting labels. */
  url: string;
  mineralNameRu: string;
}

export default function QRCode({ url, mineralNameRu }: QRCodeProps) {
  const [showPrintCard, setShowPrintCard] = useState(false);

  return (
    <div className="glass-panel flex flex-col items-center gap-4 rounded-2xl p-6 text-center">
      <p className="label-eyebrow">QR-код образца</p>
      <div className="rounded-xl bg-white p-3">
        <QRCodeSVG value={url} size={144} level="M" />
      </div>
      <p className="max-w-[220px] break-all font-mono text-[0.7rem] text-parchment-400">{url}</p>
      <p className="text-xs text-parchment-400">
        Код содержит только ссылку на страницу — данные образца можно обновлять без перепечатки таблички.
      </p>
      <button
        onClick={() => setShowPrintCard(true)}
        className="rounded-full border border-amethyst-500/50 bg-amethyst-500/10 px-4 py-2 text-xs font-medium text-amethyst-400 transition-colors hover:bg-amethyst-500/20"
      >
        Печать QR
      </button>

      {showPrintCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-950/80 p-4 print:static print:bg-white"
          onClick={() => setShowPrintCard(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-xs flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center text-slate-900 shadow-2xl print:shadow-none"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-600">
              Музей минералогии и петрографии
            </p>
            <h3 className="font-display text-2xl font-semibold uppercase">{mineralNameRu}</h3>
            <QRCodeSVG value={url} size={180} level="M" />
            <p className="text-xs text-slate-600">Наведите камеру, чтобы узнать больше</p>
            <button
              onClick={() => window.print()}
              className="mt-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white print:hidden"
            >
              Распечатать
            </button>
            <button
              onClick={() => setShowPrintCard(false)}
              className="text-xs text-slate-600 underline print:hidden"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
