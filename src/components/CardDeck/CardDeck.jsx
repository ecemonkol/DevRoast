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
      className={`card-results custom-shadow w-48 h-72 overflow-auto rounded-lg 

                   transition-all duration-300 ease-in-out
                    ${isJiggle ? "animate-jiggle-once" : ""}
                    ${
                      isExpanded
                        ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-125"
                        : "scale-100"
                    }`}
      onClick={handleClick}
      style={{
        zIndex: isExpanded ? 100 : 1,
        background: isExpanded ? "#FD78AF" : "#FAFAEE",
      }}
    >
      {isExpanded ? (
        <div className="results-text   bg-customPink w-full ">
          {content.map((item, index) => (
            <ul className=" flex  w-full" key={`${item}${index}`}>
              {item.includes("%") ? (
                <li
                  className="mb-2 flex flex-row px-2 justify-between items-center
                border border-black  bg-customGreen rounded-lg w-full"
                >
                  <span className="text-sm nahrung">
                    {item.match(/[^\d%]+/)[0]}
                  </span>
                  <span className=" text-xm ">
                    {item.slice(-4) == "100%" ? "100%" : item.slice(-3)}
                  </span>
                </li>
              ) : (
                <li className=" break-words mb-2 border px-2 items-center w-full border-black bg-customGreen rounded-lg">
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
