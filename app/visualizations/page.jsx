import dynamic from "next/dynamic";

// Dynamically import the visualizations to ensure D3 is only used on the client side
const ClusterVisualization = dynamic(
  () => import("../../components/ClusterVisualization"),
  { ssr: false },
);
const EdgeWeightingVisualization = dynamic(
  () => import("../../components/EdgeWeightingVisualization"),
  { ssr: false },
);

export default function Visualizations() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-12">
      <h1 className="text-4xl font-bold mb-12">
        Philosophical Movements Visualizations
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 w-full max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-2xl font-semibold mb-4">Cluster Visualization</h3>
          <div className="w-full h-64 overflow-hidden">
            <ClusterVisualization />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <h3 className="text-2xl font-semibold mb-4">
            Edge Weighting Visualization
          </h3>
          <div className="w-full h-64 overflow-hidden">
            <EdgeWeightingVisualization />
          </div>
        </div>
      </div>
    </main>
  );
}
