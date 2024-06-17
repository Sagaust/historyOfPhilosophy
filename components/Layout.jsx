"use client";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer className="bg-purple-700 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Philosophy App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
