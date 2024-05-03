import React from "react";
import { Link, useParams } from "react-router-dom";

function InstructionPage() {
  const { type } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-lg text-center">
        <p className="space-grotesk">
          Get ready to click, laugh, and share! Our group project brings you a
          real-time survey experience built with React JS and a live API. As you
          answer, we'll capture and project data for instant enjoyment. Let’s
          make this interactive session a highlight of our cohort!
        </p>
      </div>
      <Link to={`/choose-avatar`} className="mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full lexend-deca">
          START
        </button>
      </Link>
    </div>
  );
}

export default InstructionPage;
