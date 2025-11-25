// Learnova / Client / src / pages / educator / MyCourses.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import { formatDDMMYYYYWithTimeAMPM } from "../../utils/date";

const MyCourses = () => {
  const {
    navigate,
    currency,
    allCourses,
    setAllCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses,
  } = useContext(AppContext);

  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-200">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-black border-b border-gray-200 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">
                  All Courses
                </th>

                <th className="px-4 py-3 font-semibold truncate">Earnings</th>

                <th className="px-4 py-3 font-semibold truncate">Students</th>

                <th className="px-4 py-3 font-semibold truncate">
                  Published On
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-black">
              {courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-200">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course Image"
                      className="w-16"
                    />

                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>

                  <td className="px-4 py-3">
                    {/* {new Date(course.createdAt).toLocaleDateString()} */}

                    {/* {formatDDMMYYYYWithTimeAMPM(course.createdAt)} */}

                    <div className="flex flex-col">
                      <span className="font-medium">
                        {
                          formatDDMMYYYYWithTimeAMPM(course.createdAt).split(
                            " "
                          )[0]
                        }{" "}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {formatDDMMYYYYWithTimeAMPM(course.createdAt)
                          .split(" ")
                          .slice(1)
                          .join(" ")}{" "}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;
