"use client"
import React from "react";
import Lottie from "lottie-react";
import loaderJSON from "../../../public/Loader.json";

function Loader() {
  return (
    <>
      <div className="w-[22%]">
        <Lottie animationData={loaderJSON} loop={true} />
      </div>
    </>
  );
}

export default Loader;
