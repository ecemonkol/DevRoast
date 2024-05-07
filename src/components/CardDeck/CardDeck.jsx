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
                        ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-125"
                        : "scale-100"
                    }`}
      onClick={handleClick}
      style={{ zIndex: isExpanded ? 100 : 1 }}
    >
      {isExpanded ? (
        <div className="results-text">
          {content.map((item, index) => (
            <ul key={`${item}${index}`}>
              {item.includes("%") ? (
                <li className="flex justify-between border-2 border-black px-6 mx-4 bg-customGreen rounded-lg">
                  <span className="text-sm">{item.match(/[^\d%]+/)[0]}</span>
                  <span className=" text-xm ">
                    {item.slice(-4) == "100%" ? "100%" : item.slice(-3)}
                  </span>
                </li>
              ) : (
                <li className="border-2 border-black px-6 mx-4 bg-customGreen rounded-lg">
                  <span className="text">{item}</span>
                </li>
              )}
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
