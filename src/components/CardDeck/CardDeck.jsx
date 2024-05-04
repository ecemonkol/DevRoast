import React from "react";
import { useState } from "react";

function CardDeck() {
  const [jiggle, setIsJiggle] = useState(false);

  //Function to toggle the animation state:

  const toggleJiggle = () => {
    setIsJiggle(true);
  };
  return (
    <div className="w-48 h-72 bg-customPink rounded-lg hover:animate-jiggle">
      Hover over me
    </div>
    // <div
    //   className={`w-48 h-72 bg-customPink rounded-lg ${
    //     jiggle ? "animate-jiggle" : ""
    //   }`}
    //   onClick={toggleJiggle}
    // >
    //   Click me
    // </div>
  );
}

export default CardDeck;
