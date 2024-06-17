"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CourseDetail = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetch(`/api/courseDetails/${courseId}`)
        .then((response) => response.json())
        .then((data) => setCourseDetail(data))
        .catch((error) => console.error("Failed to fetch course details", error));
    }
  }, [courseId]);

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{courseDetail[0]?.course}</h2>
      <ul>
        {courseDetail.map((detail) => (
          <li key={detail.topic_id}>
            <h3>{detail.topic}</h3>
            <p>{detail.Readings}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
