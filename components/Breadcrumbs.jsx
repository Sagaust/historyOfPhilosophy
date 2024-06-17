// components/Breadcrumbs.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const CustomBreadcrumbs = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <nav className="bg-purple-200 p-3 rounded-md shadow-sm mb-4">
      <ol className="list-reset flex">
        <li>
          <Link href="/" className="text-purple-700 hover:text-purple-900">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{value}</span>
              ) : (
                <Link
                  href={href}
                  className="text-purple-700 hover:text-purple-900 capitalize"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CustomBreadcrumbs;
