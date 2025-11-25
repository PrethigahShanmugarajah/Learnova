// Learnova / Client / src / components / educator / Sidebar.jsx
import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { FiHome, FiPlusCircle, FiBook, FiUserCheck } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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

  // const menuItems = [
  //   { name: "Dashboard", path: "/educator", icon: assets.home_icon },
  //   { name: "Add Course", path: "/educator/add-course", icon: assets.add_icon },
  //   {
  //     name: "My Courses",
  //     path: "/educator/my-courses",
  //     icon: assets.my_course_icon,
  //   },
  //   {
  //     name: "Student Enrolled",
  //     path: "/educator/student-enrolled",
  //     icon: assets.person_tick_icon,
  //   },
  // ];

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: <FiHome className="size-6" />,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icon: <FiPlusCircle className="size-6 " />,
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: <FiBook className="size-6" />,
    },
    {
      name: "Student Enrolled",
      path: "/educator/student-enrolled",
      icon: <FiUserCheck className="size-6" />,
    },
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-200 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                isActive
                  ? "bg-green-50 border-r-[6px] border-green-500/90 text-green-500"
                  : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90 text-black"
              }`
            }
          >
            {/* <img src={item.icon} alt={item.icon} className="w-6 h-6" /> */}
            <span className="w-6 h-6">{item.icon}</span>
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
