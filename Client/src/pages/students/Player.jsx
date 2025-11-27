import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlinePlay } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating";
import Loading from "../../components/Loading";
import {
  addCourseRating,
  fetchCourseProgress,
  markLectureAsCompleted,
} from "../../services/request";
import { fetchUserEnrolledCourses } from "../../services/fetch";

const Player = () => {
  const {
    calculateChapterTime,
    enrolledCourses,
    setEnrolledCourses,
    userData,
    getToken,
  } = useContext(AppContext);

  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  useEffect(() => {
    const fetchProgress = async () => {
      if (courseData) {
        const token = await getToken();
        const progress = await fetchCourseProgress(courseId, token);
        setProgressData(progress);
      }
    };
    fetchProgress();
  }, [courseData]);

  const handleCompleteLecture = async (lectureId) => {
    const token = await getToken();
    await markLectureAsCompleted(courseId, lectureId, token);
    const progress = await fetchCourseProgress(courseId, token);
    setProgressData(progress);
  };

  const handleRateCourse = async (rating) => {
    const token = await getToken();
    await addCourseRating(courseId, rating, token);
    fetchUserEnrolledCourses(setEnrolledCourses, getToken);
  };

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* -------- LEFT COLUMN -------- */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-200 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
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
                          {progressData?.lectureCompleted?.includes(
                            lecture?.lectureId
                          ) ? (
                            <BsCheckCircleFill className="w-4 h-4 mt-1 text-green-500" />
                          ) : (
                            <HiOutlinePlay className="w-4 h-4 mt-1" />
                          )}

                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p className="mt-1">{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      lectureId: lecture.lectureId,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-green-500 cursor-pointer"
                                >
                                  Watch
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

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course:</h1>
            <Rating initialRating={initialRating} onRate={handleRateCourse} />
          </div>
        </div>

        {/* -------- RIGHT COLUMN -------- */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />

              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>

                <button
                  onClick={() => handleCompleteLecture(playerData.lectureId)}
                  className="text-green-600 cursor-pointer"
                >
                  {progressData &&
                  progressData.lectureCompleted.includes(playerData.lectureId)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} alt="" />
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;
