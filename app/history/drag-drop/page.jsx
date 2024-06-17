"use client";

import PhilosopherGame from "../../../components/PhilosopherGame";
import CustomBreadcrumbs from "../../../components/Breadcrumbs";

const HistoryDragDrop = () => {
  return (
    <div className="p-4">
      <PhilosopherGame />
      <CustomBreadcrumbs showFullPaths />
    </div>
  );
};

export default HistoryDragDrop;
