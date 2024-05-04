import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const URLanswers = "https://questions-server.adaptable.app/answers";

function ResultsPage() {
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { type } = useParams();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getQuestions = () => {
      const URL = `https://questions-server.adaptable.app/surveys?type=${type}&_embed=questions`;
      axios
        .get(URL)
        .then((resp) => {
          const allQuestions = resp.data[0].questions;
          setQuestions(allQuestions);
        })
        .catch((err) => setErr(err));
    };
    getQuestions();
  }, []);

  useEffect(() => {
    if (questions) {
      const promises = questions.map((question) =>
        axios.get(`${URLanswers}?survey=${type}&questionId=${question.id}`)
      );

      Promise.all(promises)
        .then((arr) => {
          const newResults = {};
          arr.forEach((resp, index) => {
            const allAnswers = [];
            resp.data.forEach((answer) => allAnswers.push(answer.answerText));
            newResults[questions[index].text] = allAnswers;
          });
          setResults(newResults);
          console.log(newResults);
        })
        .catch((err) => setErr(err))
        .finally(() => setIsLoading(false));
    }
  }, [questions]);

  if (err)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        Opps, something went wrong.
      </div>
    );
  if (isLoading)
    return (
      <div className="wrapper">
        <div className="loader">
          <div className="loading one"></div>
          <div className="loading two"></div>
          <div className="loading three"></div>
          <div className="loading four"></div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 space-grotesk">
      <div className="questions-container max-w-screen-md">
        {results &&
          Object.keys(results).map((question, index) => (
            <div key={index} className="question text-center mb-8">
              <h3>{question}</h3>
              <ul className="text-customGreen">
                {results[question].map((answer, answerIndex) => (
                  <li key={answerIndex}>{answer}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <Link to="/">
        <button className="button-56" role="button">
          Back Home
        </button>
      </Link>
    </div>
  );
}

export default ResultsPage;
