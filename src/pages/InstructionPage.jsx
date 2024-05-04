import React from "react";
import { Link, useParams } from "react-router-dom";

function InstructionPage() {
  const { type } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" max-w-lg text-center  p-10 rounded-lg mb-8">
        <h1 className="space-grotesk text-5xl">Instructions</h1>
        <p className="list-none space-grotesk text-xl">
          <li>1. Select a mode and blablaa</li>
          <li>2. Don't be lethargic and answer the questions on time</li>
          <li>3. Enjoy the results</li>
        </p>
      </div>
      <Link to="/choose-avatar">
        <button className="button-56  " role="button">
          START
        </button>
      </Link>
    </div>
  );
}

export default InstructionPage;
