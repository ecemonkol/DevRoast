import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl mb-8 text-customGreen ibm-plex-mono-bold">
        Hello! <br />
        Here we go!
      </h1>
      <div className="absolute bottom-0 left-0 mb-6 ml-6 ">
        <Link to="/about">
          <button className="about-button  bg-customBeige text-black border-black border-2 ">
            <span className="plus  text-black space-grotesk">About</span>
          </button>
        </Link>
      </div>
      <Link to="/instructions">
        <button className="button-56" role="button">
          Next
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
