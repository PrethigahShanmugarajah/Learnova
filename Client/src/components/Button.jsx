// Learnova / Client / src / components / Button.jsx
import React from "react";

const Button = ({ text, children, onClick, className, type, variant }) => {
  const variants = {
    primary:
      "bg-green-500 text-white border border-green-500 hover:bg-green-600",
    secondary:
      "bg-transparent text-black border border-white hover:bg-gray-900",
    text: "bg-transparent text-black border-none hover:bg-transparent",
  };

  const baseClasses = `cursor-pointer px-6 py-2 rounded-md transition hover:rounded-full ${variants[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${className || ""}`}
    >
      {children || text}
    </button>
  );
};

export default Button;
