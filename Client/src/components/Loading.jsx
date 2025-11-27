import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Loading = () => {
  const { path } = useParams();
  const { navigate } = useContext(AppContext);

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="animate-spin rounded-full h-24 w-24 border-t-10 border-green-500 border-solid"></div>
    </div>
  );
};

export default Loading;
