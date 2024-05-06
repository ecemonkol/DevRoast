import React, { useState } from "react";
import "./CardDeck.css";

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
      className={`card-results custom-shadow w-48 h-72 bg-customPink rounded-lg
                   transition-all duration-300 ease-in-out
                    ${isJiggle ? "animate-jiggle-once" : ""}
                    ${
                      isExpanded
                        ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  scale-125 z-999"
                        : "relative z-0 scale-100"
                    }`}
      onClick={handleClick}
    >
      {isExpanded ? (
        <div className="results-text">
          {content.map((item, index) => (
            <ul>
              <li key={`${item}${index}`}>{item}</li>
            </ul>
          ))}
        </div>
      ) : (
        <div className="text-question">{title}</div>
      )}
    </div>
  );
}

export default CardDeck;
