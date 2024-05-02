import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function InstructionPage() {
  const { surveyId } = useParams();
  return (
    <div>
      <div>
        "Get ready to click, laugh, and share! Our group project brings you a
        real-time survey experience built with React JS and a live API. As you
        answer, we'll capture and project data for instant enjoyment. Let’s make
        this interactive session a highlight of our cohort!"
      </div>
      <Link to={`/instructions/${surveyId}/0`}>
        <button>START</button>
      </Link>
    </div>
  );
}

export default InstructionPage;
