import React from "react";
import CardDeck from "./CardDeck";

function CardGrid({ results, totalUsers }) {
  const { optionResults, freeInputResults } = results || {
    optionResults: {},
    freeInputResults: {},
  };

  const combinedResults = [
    ...Object.entries(optionResults).map(([question, answers]) => ({
      question,
      content: Object.entries(answers)
        .map(
          ([answerText, count]) =>
            `${answerText || "No answer"} - ${count} (${Math.round(
              (count / totalUsers) * 100
            )}%)`
        )
        .join(", "),
    })),
    ...Object.entries(freeInputResults).map(([question, answers]) => ({
      question,
      content: answers.filter((answer) => answer.trim() !== "").join(", "),
    })),
  ];

  return (
    <div className="mx-auto p-1 max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-4">
        {combinedResults.map((result, index) => (
          <div key={index} className="card">
            <CardDeck title={result.question} content={result.content} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
