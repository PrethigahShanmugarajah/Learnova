import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3">
      <Link to="/">
        <img src={assets.Logo_Dark} alt="Logo" className="w-28 lg:w-32" />
      </Link>

      <div className="flex items-center gap-5 text-black relative">
        <p>Hi! {user ? user.fullName : "Developers"}</p>

        {user ? (
          <UserButton />
        ) : (
          <BsPersonCircle className="max-w-8 size-8 text-green-800" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
