import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseMode() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const type = e.target.value;
    navigate(`/${type}/1`);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-grotesk">
      <h1 className="text-4xl mb-4">Choose the Mode</h1>
      <button
        onClick={handleClick}
        value="sarcastic"
        className="bg-customPink hover:bg-customPinkHover text-white font-bold px-6 rounded-full w-48 h-12 lexend-deca"
      >
        Sarcastic mode
      </button>
      <button
        onClick={handleClick}
        value="omar"
        className="bg-customPink hover:bg-customPinkHover text-white font-bold px-6 rounded-full w-48 h-12 lexend-deca"
      >
        Omar mode
      </button>
      <button
        onClick={handleClick}
        value="cute"
        className="bg-customPink hover:bg-customPinkHover text-white font-bold px-6 rounded-full w-48 h-12 lexend-deca"
      >
        Cute mode
      </button>
    </div>
  );
}

export default ChooseMode;
