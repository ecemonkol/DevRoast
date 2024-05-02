import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8">Hello!</h1>
      <Link to="/about">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          About
        </button>
      </Link>
      <Link to="/choose-avatar">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
