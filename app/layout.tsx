// app/layout.tsx
import React, { ReactNode } from "react";
import Link from "next/link";

type LayoutProps = {
  children: ReactNode;
};

const ModulesLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <h1>Philosophy Modules</h1>
        <nav>
          <Link href="/modules">All Modules</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default ModulesLayout;
