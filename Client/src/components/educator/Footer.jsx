// Learnova / Client / src / components / educator / Footer.jsx
import React from "react";
import { assets } from "../../assets/assets";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <img src={assets.Logo_Dark} alt="Logo" className="hidden:block w-20" />

        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>

        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright {new Date().getFullYear()} &copy; Learnova. All Right
          Reserved.
        </p>
      </div>

      <div className="flex items-center gap-3 max-md:mt-4">
        {/* <a href="#">
          <img src={assets.facebook_icon} alt="FaceBook_Icon" />
        </a>

        <a href="#">
          <img src={assets.twitter_icon} alt="Twitter_Icon" />
        </a>

        <a href="#">
          <img src={assets.instagram_icon} alt="Instagram_Icon" />
        </a> */}

        <a
          href="#"
          className="size-8 flex items-center justify-center bg-blue-600 rounded-full text-white hover:scale-105 transition"
        >
          <FaFacebookF className="size-4" />
        </a>

        <a
          href="#"
          className="size-8 flex items-center justify-center bg-blue-400 rounded-full text-white hover:scale-105 transition"
        >
          <FaTwitter className="size-4" />
        </a>

        <a
          href="#"
          className="size-8 flex items-center justify-center bg-linear-to-tr from-pink-500 to-yellow-400 rounded-full text-white hover:scale-105 transition"
        >
          <FaInstagram className="size-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
