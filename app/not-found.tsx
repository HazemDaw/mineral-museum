import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="label-eyebrow">Образец не найден</p>
      <h1 className="font-display text-3xl text-parchment-50">Такой минерал отсутствует в коллекции</h1>
      <p className="max-w-md text-sm text-parchment-400">
        Возможно, QR-код указывает на устаревшую ссылку. Вернитесь в общий каталог, чтобы найти образец.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-amethyst-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amethyst-600"
      >
        К каталогу минералов
      </Link>
    </main>
  );
}
