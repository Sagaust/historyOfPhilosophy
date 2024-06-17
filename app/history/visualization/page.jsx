"use client";

import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const VisualizationPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Visualization</h1>
      <div>
        <p>
          This page will contain visualizations related to the history of
          philosophy.
        </p>
      </div>
      <CustomBreadcrumbs showFullPaths />
    </div>
  );
};

export default VisualizationPage;
