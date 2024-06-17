import React, { useEffect, useState } from "react";

const CourseDetail = ({ courseId }) => {
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await fetch(`/api/courseDetails/${courseId}`);
        const data = await response.json();
        setCourseDetail(data);
      } catch (error) {
        console.error("Failed to fetch course detail:", error);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{courseDetail.title}</h2>
      <p className="text-gray-600">{courseDetail.description}</p>
      <div className="mt-4">
        {courseDetail.topics.map((topic) => (
          <div key={topic.topic_id} className="mb-4">
            <h3 className="text-xl font-semibold">{topic.topic}</h3>
            <p>{topic.readings}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
