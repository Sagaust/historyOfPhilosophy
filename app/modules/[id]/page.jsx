"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const CourseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [courseDetail, setCourseDetail] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCourseDetail();
    }
  }, [id]);

  const fetchCourseDetail = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      setCourseDetail(response.data);
    } catch (error) {
      console.error("Failed to fetch course details", error);
    }
  };

  if (!courseDetail) return <div>Loading...</div>;

  return (
    <div>
      <h1>{courseDetail.course}</h1>
      <p>{courseDetail.topic}</p>
      <p>{courseDetail.Readings}</p>
    </div>
  );
};

export default CourseDetail;
