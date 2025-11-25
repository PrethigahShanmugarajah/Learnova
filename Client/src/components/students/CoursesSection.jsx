// Learnova / Client / src / components / students / CoursesSection.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import Button from "../Button";

const CoursesSection = () => {
  const { navigate, currency, allCourses, setAllCourses } =
    useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8 bg-slate-50 mt-10 w-full">
      <h2 className="text-3xl font-medium text-black">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to <br /> business and wellness, our courses are crafted to
        deliver results.
      </p>

      <div className="grid grid-auto px-4 md:px-0 md:my-16 my-10 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      {/* <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-200 px-10 py-3 rounded"
      >
        Show all courses
      </Link> */}

      <Button
        onClick={() => {
          navigate("/course-list");
          scrollTo(0, 0);
        }}
        className="mt-4"
        variant="secondary"
      >
        Show all courses
      </Button>
    </div>
  );
};

export default CoursesSection;
