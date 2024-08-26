import { LogInFormModal } from "@/components/LogInFormModal";

export default async function Home() {
  return (
    <main className="flex h-dvh items-center justify-center bg-[url(/pila-libros.avif)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <h1 className="text-6xl font-bold text-white">AulaControl</h1>
        <LogInFormModal />
      </div>
    </main>
  );
}
