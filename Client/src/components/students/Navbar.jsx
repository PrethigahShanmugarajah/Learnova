import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import Button from "../Button";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { BsPersonCircle } from "react-icons/bs";
import { AppContext } from "../../context/AppContext";
import { becomeEducator } from "../../services/request";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("course-list");

  const { navigate, isEducator, setIsEducator, getToken } =
    useContext(AppContext);

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.Logo_Dark}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-black">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <Button
                onClick={() =>
                  becomeEducator(getToken, setIsEducator, navigate)
                }
                className="px-0!"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </Button>
              | <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

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
              <Button
                onClick={() =>
                  becomeEducator(getToken, setIsEducator, navigate)
                }
                className="px-0!"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </Button>
              | <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <Button onClick={() => openSignIn()} variant={"text"}>
            <BsPersonCircle className="size-7.5 text-green-800" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
