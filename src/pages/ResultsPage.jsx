import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URLanswers = "https://questions-server.adaptable.app/answers";

function ResultsPage() {
  const [results, setResults] = useState(null);
  const { type } = useParams();

  useEffect(() => {
    axios.get(`${URLanswers}?survey=sarcastic&questionId=1`).then((resp) => {
      //only the first question from the survey sarcastic
      setResults(resp.data);
      console.log(resp.data);
    });
  }, [type]);

  return (
    <div>
      {results && results.length > 0 && (
        <>
          <div>{results[0].questionText}</div>
          {results.map((answer) => (
            <div key={answer.id}>{answer.answerText}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default ResultsPage;
