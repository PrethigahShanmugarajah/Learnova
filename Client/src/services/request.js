import axios from "axios";
import { toast } from "react-toastify";
import API_ROUTES from "../utils/api_routes";

/* -------- Become Educator -------- */
export const becomeEducator = async (getToken, setIsEducator, navigate) => {
  try {
    const token = await getToken();
    const { data } = await axios.get(API_ROUTES.UPDATE_ROLE_EDUCATOR, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setIsEducator(true);
      toast.success(data.message);
      navigate("/educator");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Become Educator Error:", error.message);
  }
};

/* -------- Enroll / Purchase Course -------- */
export const enrollCourse = async (courseId, token) => {
  try {
    if (!token) {
      toast.warn("Login to Enroll");
      return;
    }

    const { data } = await axios.post(
      API_ROUTES.PURCHASE_COURSE,
      { courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      const { session_url } = data;
      window.location.replace(session_url);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Enroll / Purchase Course Error:", error.message);
  }
};

/* -------- Get Course Progress -------- */
export const getCourseProgress = async (
  enrolledCourses,
  token,
  calculateNoOfLectures
) => {
  try {
    const progressArray = await Promise.all(
      enrolledCourses.map(async (course) => {
        const { data } = await axios.post(
          API_ROUTES.GET_COURSE_PROGRESS,
          { courseId: course._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const totalLectures = calculateNoOfLectures(course);
        const lectureCompleted = data.progressData
          ? data.progressData.lectureCompleted.length
          : 0;

        return { totalLectures, lectureCompleted };
      })
    );

    return progressArray;
  } catch (error) {
    toast.error(error.message);
    console.error("Get Course Progress Error:", error.message);
    return [];
  }
};

/* -------- Mark Lecture As Completed -------- */
export const markLectureAsCompleted = async (courseId, lectureId, token) => {
  try {
    const { data } = await axios.post(
      API_ROUTES.UPDATE_COURSE_PROGRESS,
      { courseId, lectureId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) toast.success(data.message);
    else toast.error(data.message);

    return data;
  } catch (error) {
    toast.error(error.message);
    console.error("Mark Lecture As Completed Error:", error.message);
    return null;
  }
};

/* -------- Fetch Course Progress -------- */
export const fetchCourseProgress = async (courseId, token) => {
  try {
    const { data } = await axios.post(
      API_ROUTES.GET_COURSE_PROGRESS,
      { courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!data.success) toast.error(data.message);
    return data.success ? data.progressData : null;
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch Course Progress Error:", error.message);
    return null;
  }
};

/* -------- Add Rating -------- */
export const addCourseRating = async (courseId, rating, token) => {
  try {
    const { data } = await axios.post(
      API_ROUTES.ADD_RATING,
      { courseId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) toast.success(data.message);
    else toast.error(data.message);

    return data;
  } catch (error) {
    toast.error(error.message);
    console.error("Add Rating Error:", error.message);
    return null;
  }
};

/* -------- Add Course (Educator) -------- */
export const addCourseRequest = async (courseData, image, token) => {
  try {
    const formData = new FormData();
    formData.append("courseData", JSON.stringify(courseData));
    formData.append("image", image);

    const { data } = await axios.post(API_ROUTES.ADD_COURSE, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) toast.success(data.message);
    else toast.error(data.message);

    return data;
  } catch (error) {
    toast.error(error.message);
    console.error("Add Course (Educator) Error:", error.message);
    return null;
  }
};
