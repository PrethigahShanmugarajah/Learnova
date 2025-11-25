// Learnova / Client / src / components / students / Loading.jsx
import React, { useEffect } from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-24 w-24 border-t-10 border-green-500 border-solid"></div>
    </div>
  );
};

export default Loading;
