import Link from "next/link";
import Layout from "../../components/Layout";

const Epistemology = () => {
  return (
    <Layout>
      <div className="flex">
        <aside className="w-1/4 p-4 bg-gray-100">
          <h2 className="text-xl font-bold mb-4">Epistemology</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/epistemology/visualization">Visualization Card</Link>
            </li>
            <li>
              <Link href="/epistemology/timeline">Timeline Card</Link>
            </li>
            <li>
              <Link href="/epistemology/drag-drop">Drag and Drop Game</Link>
            </li>
          </ul>
        </aside>
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Epistemology</h1>
          <p>Main content goes here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Epistemology;
