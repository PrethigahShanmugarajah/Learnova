//Learnoa / Client / src / context / AppContext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Function to calculate Average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return totalRating / course.courseRatings.length;
  };

  // Function to Calculate Course Chapter Time
  // const calculateChapterTime = (chapter) => {
  //   let time = 0;
  //   chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
  //   return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  // };
  const calculateChapterTime = (chapter) => {
    let time = 0;
    if (Array.isArray(chapter.chapterContent)) {
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration)
      );
    }
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to Calculate Course Duration
  // const calculateCourseDuration = (course) => {
  //   let time = 0;
  //   course.courseContent.map((chapter) =>
  //     chapter.courseContent.map((lecture) => (time += lecture.lectureDuration))
  //   );
  //   return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  // };
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        chapter.chapterContent.forEach((lecture) => {
          time += lecture.lectureDuration;
        });
      }
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to Calculate to No of Lectures in the course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
