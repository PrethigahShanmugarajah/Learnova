// Learnova / Client / src / pages / students / CoursesList.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/students/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/students/CourseCard";
import { assets } from "../../assets/assets";
import { FiX } from "react-icons/fi";
import Footer from "../../components/students/Footer";
import Button from "../../components/Button";

const CoursesList = () => {
  const {
    navigate,
    currency,
    allCourses,
    setAllCourses,
    calculateRating,
    isEducator,
    setIsEducator,
  } = useContext(AppContext);
  const { input } = useParams();
  console.log("useParams input:", input);

  const [filteredCourse, setFilteredCourse] = useState([]);

  // useEffect(() => {
  //   if (allCourses && allCourses.length > 0) {
  //     const tempCourses = allCourses.slice();

  //     input
  //       ? setFilteredCourse(
  //           tempCourses.filter((item) =>
  //             item.courseTitle.toLowerCase().includes(input.toLowerCase())
  //           )
  //         )
  //       : setFilteredCourse(tempCourses);
  //   }
  // }, [allCourses, input]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      if (input) {
        const filtered = tempCourses.filter((item) =>
          item.courseTitle.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredCourse(filtered);
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>

            <p className="text-gray-500">
              <span
                className="text-green-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              / <span>Course List</span>
            </p>
          </div>

          {/* <SearchBar data={input} /> */}
          <SearchBar key={input || "clear"} data={input || ""} />
        </div>

        {/* {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="Cross_Icon"
              className="cursor-pointer"
              onClick={() => navigate("/course-list")}
            />
          </div>
        )} */}

        {input && (
          // <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
          //   <p>{input}</p>
          //   <img
          //     src={assets.cross_icon}
          //     alt="Cross_Icon"
          //     className="cursor-pointer"
          //     onClick={() => {
          //       navigate("/course-list", { replace: true });
          //     }}
          //   />
          // </div>

          <Button
            variant="secondary"
            className="inline-flex items-center gap-2 mt-8 -mb-8 px-4 py-2 text-gray-600"
            onClick={() => navigate("/course-list", { replace: true })}
          >
            <span>{input}</span>
            <FiX className="size-6" />
          </Button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;
