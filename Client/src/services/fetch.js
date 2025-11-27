import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTES } from "../utils/api_routes";

/* -------- Fetch All Courses -------- */
export const fetchAllCourses = async (setAllCourses) => {
  try {
    const { data } = await axios.get(API_ROUTES.GET_ALL_COURSES);

    if (data.success) {
      setAllCourses(data.courses);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch All Courses Error:", error.message);
  }
};

/* -------- Fetch User Data -------- */
export const fetchUserData = async (
  setUserData,
  getToken,
  setIsEducator,
  user
) => {
  try {
    if (user?.publicMetadata?.role === "educator") {
      setIsEducator(true);
    }

    const token = await getToken();
    const { data } = await axios.get(API_ROUTES.GET_USER_DATA, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setUserData(data.user);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch User Data Error:", error.message);
  }
};

/* -------- Fetch User Enrolled Courses -------- */
export const fetchUserEnrolledCourses = async (
  setEnrolledCourses,
  getToken
) => {
  try {
    const token = await getToken();
    const { data } = await axios.get(API_ROUTES.GET_ENROLLED_COURSES, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setEnrolledCourses(data.enrolledCourses.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch User Enrolled Courses Error:", error.message);
  }
};

/* -------- Fetch Single Course By ID -------- */
export const fetchCourseData = async (id, setCourseData) => {
  try {
    const { data } = await axios.get(API_ROUTES.GET_COURSE_BY_ID(id));

    if (data.success) {
      setCourseData(data.courseData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch Single Course By ID Error:", error.message);
  }
};

/* -------- Fetch Educator Courses -------- */
export const fetchEducatorCourses = async (token) => {
  try {
    const { data } = await axios.get(API_ROUTES.GET_EDUCATOR_COURSES, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data.success) toast.error(data.message);

    return data;
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch Educator Courses Error:", error.message);
    return null;
  }
};

/* -------- Fetch Enrolled Students -------- */
export const fetchEnrolledStudents = async (getToken, setEnrolledStudents) => {
  try {
    const token = await getToken();
    const { data } = await axios.get(API_ROUTES.GET_ENROLLED_STUDENTS, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      const students = Array.isArray(data.enrolledStudents)
        ? data.enrolledStudents
        : [];
      setEnrolledStudents(students.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch Enrolled Students Error:", error.message);
  }
};

/* -------- Fetch Educator Dashboard Data -------- */
export const fetchDashboardData = async (getToken, setDashboardData) => {
  try {
    const token = await getToken();
    const { data } = await axios.get(API_ROUTES.GET_EDUCATOR_DASHBOARD, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (data.success) {
      setDashboardData(data.dashboardData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Fetch Educator Dashboard Data Error:", error.message);
  }
};
