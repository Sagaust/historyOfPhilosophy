"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/courseDetails/${id}`)
        .then((response) => response.json())
        .then((data) => setCourseDetail(data))
        .catch((error) => console.error("Failed to fetch course details", error));
    }
  }, [id]);

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
