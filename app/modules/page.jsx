"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import CourseDetail from "../../components/CourseDetail";

const Modules = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    setSelectedCourseId(courseId);
  };

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-3xl font-bold mb-4">Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={handleCourseClick}
          />
        ))}
      </div>
      <div className="mt-8">
        {selectedCourseId && <CourseDetail courseId={selectedCourseId} />}
      </div>
    </div>
  );
};

export default Modules;
