// Learnova / Client / src / pages / students / CourseDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
// import Loading from "../../components/students/Loading";
import Loading from "../../components/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiOutlinePlay } from "react-icons/hi";
import { FiChevronDown, FiClock } from "react-icons/fi";
import { BsStopwatch } from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu";
import Button from "../../components/Button";
import Footer from "../../components/students/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
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
  } = useContext(AppContext);
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-linear-to-b from-cyan-100/70"></div>
        {/* -------- LEFT COLUMN -------- */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:course-details-heading-large course-details-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* ---- REVIEW AND RATINGS ---- */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {/* {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(course))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="Star"
                  className="w-3.5 h-3.5"
                />
              ))} */}

              {[...Array(5)].map((_, i) => {
                const rating = Math.floor(calculateRating(courseData));
                return i < rating ? (
                  <AiFillStar key={i} className="w-3.5 h-3.5 text-yellow-500" />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="w-3.5 h-3.5 text-yellow-500"
                  />
                );
              })}
            </div>

            <p className="text-green-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            {" "}
            Course by{" "}
            <span className="text-green-600 underline">
              {/* {course.educator.name} */}
              Sathya
            </span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      {/* <img
                        src={assets.down_arrow_icon}
                        alt="Down_Arrow_Icon"
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      /> */}
                      <FiChevronDown
                        className={`w-4 h-4 transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>

                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    } `}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-200">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          {/* <img
                            src={assets.play_icon}
                            alt="Play_Icon"
                            className="w-4 h-4 mt-1"
                          /> */}

                          <HiOutlinePlay className="size-6" />

                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p className="mt-1">{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-green-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>

            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <div className="course-card z-10 custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="Course_Thumbnail" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              {/* <img
                src={assets.time_left_clock_icon}
                alt="Time_Left_Clock_Icon"
                className="w-3.5"
              /> */}
              <BsStopwatch className="size-3.5 text-red-500" />

              <p className="text-red-500">
                <span className="font-medium">5 days</span>left at this price!
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="md:text-lg text-gray-500 line-through">
                {currency} {courseData.coursePrice.toFixed(2)}
              </p>

              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                {/* <img src={assets.star} alt="Star" /> */}
                <AiFillStar className="text-yellow-500 w-4 h-4" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                {/* <img src={assets.time_clock_icon} alt="Time_Clock_Icon" /> */}
                <FiClock className="w-4 h-4" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                {/* <img src={assets.lesson_icon} alt="Lesson_Icon" /> */}
                <LuBookOpen className="size-4" />
                <p>{calculateNoOfLectures(courseData)} Lessons</p>
              </div>
            </div>

            {/* <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button> */}

            <Button className="md:mt-6 mt-4 w-full py-3" variant={"primary"}>
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </Button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Comprehensive video lectures</li>
                <li>Interactive quizzes</li>
                <li>Downloadable resources</li>
                <li>Hands-on projects</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
