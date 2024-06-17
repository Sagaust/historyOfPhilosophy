"use client";

import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const TimelinePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timeline</h1>
      <div>
        <p>
          This page will contain a timeline of significant events in the history
          of philosophy.
        </p>
      </div>
      <CustomBreadcrumbs showFullPaths />
    </div>
  );
};

export default TimelinePage;
