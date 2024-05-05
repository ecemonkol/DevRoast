import React from "react";
import { Link, useParams } from "react-router-dom";

function InstructionPage() {
  const { type } = useParams();
  return (
    <div>
      <div className="flex flex-col items-center ">
        <h1 className="space-grotesk text-5xl mt-48">Instructions</h1>
        <p className="list-none space-grotesk text-xl mt-12">
          <li>1. Select a mode and blablaa</li>
          <li>2. Don't be lethargic and answer the questions on time</li>
          <li>3. Enjoy the results</li>
        </p>
        <Link to="/choose-avatar">
          <button className="button-56  mt-20" role="button">
            START
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InstructionPage;
