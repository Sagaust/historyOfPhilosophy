// app/layout.js
import "../styles/globals.css";
import Layout from "../components/Layout";

export const metadata = {
  title: "Philosophy App",
  description: "An app to explore the world of philosophy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
