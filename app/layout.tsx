import React from "react";
import Link from "next/link";

const ModulesLayout = ({ children }) => {
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
