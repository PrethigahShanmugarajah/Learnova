// Learnova / Client / src / components / students / SearchBar.jsx
import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import Button from "../Button";
import { AppContext } from "../../context/AppContext";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = ({ data }) => {
  const { navigate } = useContext(AppContext);
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-200 rounded"
    >
      {/* <img
        src={assets.search_icon}
        alt="Search_Icon"
        className="md:w-auto w-10 px-3"
      /> */}
      <HiOutlineSearch className="md:w-auto px-3 size-12 text-gray-500" />
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses"
        className="w-full h-full outline-none text-black placeholder-gray-300"
      />
      {/* <button className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1">
        Search
      </button> */}

      <Button className="md:px-10 md:py-3 mx-1" type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
