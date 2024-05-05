import React, { useState } from "react";

function CardDeck() {
  const [isJiggle, setIsJiggle] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsJiggle(true);
    setIsExpanded(!isExpanded); // Toggle expansion

    setTimeout(() => {
      setIsJiggle(false);
    }, 500);
  };

  return (
    <div
      className={`w-48 h-72 bg-customPink rounded-lg 
                  transition-all duration-300 ease-in-out 
                  ${isJiggle ? "animate-jiggle-once" : ""} 
                  ${isExpanded ? "scale-125" : "scale-100"}`}
      onClick={handleClick}
    >
      {isExpanded ? (
        <p className="p-4">Expanded: Click again to collapse.</p>
      ) : (
        <p>Click me!</p>
      )}
    </div>
  );
}

export default CardDeck;
