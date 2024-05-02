import React from "react";
import { useNavigate } from "react-router-dom";

function ChooseMode() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const type = e.target.value;
    navigate(`/${type}/1`);
  };
  return (
    <div>
      Choose the Mode
      <button onClick={handleClick} value="sarcastic">
        Sarcastic mode
      </button>
      <button onClick={handleClick} value="omar">
        Omar mode
      </button>
      <button onClick={handleClick} value="cute">
        Cute mode
      </button>
    </div>
  );
}

export default ChooseMode;
