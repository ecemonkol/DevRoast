import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl mb-8 text-customGreen space-grotesk">
        Hello! Here we go!
      </h1>
      <div className="absolute bottom-0 left-0 mb-6 ml-6 ">
        <Link to="/about">
          <button className="about-button lexend-deca">
            <span className="plus">About</span>
          </button>
        </Link>
      </div>
      <Link to="/instructions">
        <button className="bg-customPink hover:bg-customPinkHover text-white font-bold px-6 rounded-full w-48 h-12 lexend-deca">
          Next
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
