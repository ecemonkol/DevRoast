import React, { useState } from "react";

function CardDeck({ title, content }) {
  const [isJiggle, setIsJiggle] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsJiggle(true);
    setIsExpanded(!isExpanded);

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
        <div className="p-4">
          <p>{content}</p>
        </div>
      ) : (
        <h4>{title}</h4>
      )}
    </div>
  );
}

export default CardDeck;
