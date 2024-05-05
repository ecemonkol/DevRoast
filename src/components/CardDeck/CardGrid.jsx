import React from "react";
import CardDeck from "./CardDeck";

function CardGrid() {
  const cardsData = [
    { expandedText: "Expanded Content 1", defaultText: "Click me 1!" },
    { expandedText: "Expanded Content 2", defaultText: "Click me 2!" },
    { expandedText: "Expanded Content 3", defaultText: "Click me 3!" },
    { expandedText: "Expanded Content 4", defaultText: "Click me 4!" },
    { expandedText: "Expanded Content 5", defaultText: "Click me 5!" },
    { expandedText: "Expanded Content 6", defaultText: "Click me 6!" },
    { expandedText: "Expanded Content 7", defaultText: "Click me 7!" },
    { expandedText: "Expanded Content 8", defaultText: "Click me 8!" },
    { expandedText: "Expanded Content 9", defaultText: "Click me 9!" },
    { expandedText: "Expanded Content 10", defaultText: "Click me 10!" },
  ];

  // Number of columns in the grid
  const numberOfColumns = 5;

  return (
    <div className="mx-auto p-1 max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className={`transform ${
              (index % 5) % 2 === 0 ? "translate-y-10" : "translate-y-0"
            }`}
          >
            <CardDeck content={card} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
