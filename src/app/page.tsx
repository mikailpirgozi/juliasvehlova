export default function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-accent-gold/10 p-4">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-5xl font-bold text-primary">Julia Estetic Clinic</h1>
        <p className="mb-8 max-w-2xl text-xl text-gray-600">
          Profesionálne služby estetickej medicíny, permanentného make-upu a profesionálneho líčenia
          v Malackách.
        </p>
        <button className="rounded-lg bg-primary px-8 py-3 text-white hover:bg-primary-dark transition">
          Rezervovať konzultáciu
        </button>
      </div>
    </main>
  )
}
