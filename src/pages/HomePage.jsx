import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/choose-avatar">
        <button>Next</button>
      </Link>
    </div>
  );
};

export default HomePage;
