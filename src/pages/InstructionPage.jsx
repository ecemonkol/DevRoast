import React from "react";
import { Link, useParams } from "react-router-dom";

function InstructionPage() {
  const { type } = useParams();
  return (
    <div>
      <div className="flex flex-col items-center ">
        <h1 className="space-grotesk text-7xl mt-48">Instructions</h1>
        <p className="list-none space-grotesk text-xl mt-12 text-center">
          <li>1. Select a mode and choose an avatar</li>
          <li>2. Don't be lethargic and answer the questions on time</li>
          <li>3. Enjoy the results</li>
        </p>
        <div></div>
        <Link to="/choose-avatar">
          <button className="button-56-p  mt-10" role="button">
            Got it
          </button>
        </Link>
        <Link to="/">
          <button className="button-56  mt-24" role="button">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InstructionPage;
