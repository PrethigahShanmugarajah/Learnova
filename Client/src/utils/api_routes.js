const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ROUTES = {
  /* -------- User -------- */
  GET_USER_DATA: `${BASE_URL}/api/user/data`,
  GET_ENROLLED_COURSES: `${BASE_URL}/api/user/enrolled-courses`,
  PURCHASE_COURSE: `${BASE_URL}/api/user/purchase`,
  UPDATE_COURSE_PROGRESS: `${BASE_URL}/api/user/update-course-progress`,
  GET_COURSE_PROGRESS: `${BASE_URL}/api/user/get-course-progress`,
  ADD_RATING: `${BASE_URL}/api/user/add-rating`,

  /* -------- Course Routes -------- */
  GET_ALL_COURSES: `${BASE_URL}/api/course/all`,
  GET_COURSE_BY_ID: (id) => `${BASE_URL}/api/course/${id}`,

  /* -------- Educator Routes -------- */
  UPDATE_ROLE_EDUCATOR: `${BASE_URL}/api/educator/update-role`,
  ADD_COURSE: `${BASE_URL}/api/educator/add-course`,
  GET_EDUCATOR_COURSES: `${BASE_URL}/api/educator/courses`,
  GET_EDUCATOR_DASHBOARD: `${BASE_URL}/api/educator/dashboard`,
  GET_ENROLLED_STUDENTS: `${BASE_URL}/api/educator/enrolled-students`,
};

export default API_ROUTES;
