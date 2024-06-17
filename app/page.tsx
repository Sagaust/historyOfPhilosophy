import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Philosophy App</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 w-full max-w-7xl">
        <Link
          href="/history"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          History of Philosophy
        </Link>
        <Link
          href="/ethics"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Ethics
        </Link>
        <Link
          href="/epistemology"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Epistemology
        </Link>
        <Link
          href="/metaphysics"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Metaphysics
        </Link>
        <Link
          href="/logic"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Logic
        </Link>
        <Link
          href="/modules"
          className="bg-purple-700 text-white p-6 rounded-lg shadow-lg hover:bg-purple-900"
        >
          Modules
        </Link>
      </div>
    </main>
  );
}
