import React from "react";
import Button from "../Button";
import { FiArrowRight } from "react-icons/fi";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 w-full mt-10">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn without limits—anytime, anywhere
      </h1>

      <p className="text-gray-500 sm:text-sm">
        Unlock a world of knowledge with expert-led courses designed to help you
        gain practical skills, grow your career, and learn at your own
        pace—wherever you are.
      </p>

      <div className="flex items-center font-medium gap-6 mt-4">
        <Button className="px-10 py-3" variant={"primary"}>
          Getstarted
        </Button>

        <Button className="flex items-center gap-2" variant={"text"}>
          Learn more <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
