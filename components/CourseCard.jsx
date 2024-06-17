import React from "react";

const CourseCard = ({ course, onClick }) => {
  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(course.id)}
    >
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p className="text-gray-600">{course.description}</p>
    </div>
  );
};

export default CourseCard;
