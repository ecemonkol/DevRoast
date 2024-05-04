import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseMode() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const type = e.target.value;
    navigate(`/${type}/1`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4 space-grotesk">Choose the Mode</h1>
      <button
        onClick={handleClick}
        value="sarcastic"
        className="button-56"
        role="button"
      >
        Sarcastic mode
      </button>
      <button
        onClick={handleClick}
        value="omar"
        className="button-56"
        role="button"
      >
        Omar mode
      </button>
      <button
        onClick={handleClick}
        value="cute"
        className="button-56"
        role="button"
      >
        Cute mode
      </button>
    </div>
  );
}

export default ChooseMode;
