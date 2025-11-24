// Learnova / Client / src / components / students / Navbar.jsx
import React from "react";
import { assets } from "../../assets/assets";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.Logo_Dark}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-black">
        <div className="flex items-center gap-5">
          {user && (
            <>
              {/* <button>Become Educator</button> */}
              <Button className="px-0!">Become Educator</Button>|{" "}
              <Link to={"/my-entrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

        {/* {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-500 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )} */}

        {user ? (
          <UserButton />
        ) : (
          <Button onClick={() => openSignIn()} variant={"primary"}>
            Create Account
          </Button>
        )}
      </div>

      {/* -------- MOBILE SCREEN -------- */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-black">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              {/* <button>Become Educator</button> */}
              <Button className="px-0!" variant={"text"}>
                Become Educator
              </Button>
              | <Link to={"/my-entrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          // <button onClick={() => openSignIn()}>
          //   <img src={assets.user_icon} alt="User_Icon" />
          // </button>

          <Button onClick={() => openSignIn()} variant={"text"}>
            {/* <img src={assets.user_icon} alt="User_Icon" /> */}
            <BsPersonCircle className="size-7.5 text-green-800" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
