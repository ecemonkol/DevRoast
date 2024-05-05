import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseMode() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const surveyId = e.target.value;
    navigate(`/${surveyId}/1`);
  };
  return (
    <div className="flex flex-col items-center mt-56 h-screen">
      <h1 className="text-5xl mb-4 space-grotesk">Choose the Mode</h1>
      <div className="flex flex-row mt-24">
        <button
          onClick={handleClick}
          value={1}
          className="button-56 mr-4"
          role="button"
        >
          Sarcastic mode
        </button>
        <button
          onClick={handleClick}
          value={2}
          className="button-56 mr-4"
          role="button"
        >
          Omar mode
        </button>
        <button
          onClick={handleClick}
          value={3}
          className="button-56"
          role="button"
        >
          Cute mode
        </button>
      </div>
    </div>
  );
}

export default ChooseMode;
