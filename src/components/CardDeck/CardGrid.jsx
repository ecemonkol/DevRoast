import React from "react";
import CardDeck from "./CardDeck";
// import "./CardDeck.css";

function CardGrid({ results, totalUsers }) {
  const { optionResults, freeInputResults } = results || {
    optionResults: {},
    freeInputResults: {},
  };

  const combinedResults = [
    ...Object.entries(optionResults).map(([question, answers]) => ({
      question,
      content: Object.entries(answers).map(
        ([answerText, count]) =>
          `${answerText || "No answer"} ${Math.round(
            (count / totalUsers) * 100
          )}%`
      ),
    })),
    ...Object.entries(freeInputResults).map(([question, answers]) => ({
      question,

      content: answers.filter((answer) => answer.trim() !== ""),
    })),
  ];

  return (
    <div className="CardGrid overflow-visible">
      <div className="p-1 max-w-5xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-14 gap-y-10">
          {combinedResults.map((result, index) => (
            <div key={index} className="card">
              <CardDeck title={result.question} content={result.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardGrid;
