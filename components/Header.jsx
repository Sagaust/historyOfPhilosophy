"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-purple-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Philosophy App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
            <li>
              <Link href="/ethics">Ethics</Link>
            </li>
            <li>
              <Link href="/epistemology">Epistemology</Link>
            </li>
            <li>
              <Link href="/logic">Logic</Link>
            </li>
            <li>
              <Link href="/metaphysics">Metaphysics</Link>
            </li>
            <li>
              <Link href="/modules">Modules</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
