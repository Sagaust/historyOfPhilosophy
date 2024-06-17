import Link from "next/link";
import Layout from "../../components/Layout";

const History = () => {
  return (
    <Layout>
      <div className="flex">
        <aside className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">History of Philosophy</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/history/visualization">Visualization Card</Link>
            </li>
            <li>
              <Link href="/history/timeline">Timeline Card</Link>
            </li>
            <li>
              <Link href="/history/drag-drop">Drag and Drop Game</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </aside>
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">History of Philosophy</h1>
          <p>Main content goes here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default History;
