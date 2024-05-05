import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardDeck from "../components/CardDeck/CardDeck";
import CardGrid from "../components/CardDeck/CardGrid";

const URLanswers = "https://questions-server.adaptable.app/answers";

function ResultsPage() {
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState({
    optionQuestions: [],
    freeInputQuestions: [],
  });
  const { type } = useParams();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filterQuestions = (questions) => {
    const optionQuestions = questions.filter((question) => question.options);
    const freeInputQuestions = questions.filter(
      (question) => !question.options
    );
    setQuestions({ optionQuestions, freeInputQuestions });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://questions-server.adaptable.app/surveys?type=${type}&_embed=questions`
        );
        const allQuestions = resp.data[0].questions;
        filterQuestions(allQuestions);
      } catch (error) {
        setErr(error);
      }
    };
    fetchData();
  }, [type]);

  useEffect(() => {
    const getResults = async () => {
      if (
        questions.optionQuestions.length > 0 ||
        questions.freeInputQuestions.length > 0
      ) {
        const promisesFreeInput = questions.freeInputQuestions.map((question) =>
          axios.get(`${URLanswers}?survey=${type}&questionId=${question.id}`)
        );
        const promisesOption = questions.optionQuestions.map((question) =>
          axios.get(`${URLanswers}?survey=${type}&questionId=${question.id}`)
        );

        const freeInputResults = {};
        const optionResults = {};

        try {
          const freeInputResponses = await Promise.all(promisesFreeInput);
          freeInputResponses.forEach((resp, index) => {
            const freeInputAnswers = resp.data.filter(
              (answer) => answer.answerText
            );
            freeInputResults[questions.freeInputQuestions[index].text] =
              freeInputAnswers.map((answer) => answer.answerText);
          });

          const optionResponses = await Promise.all(promisesOption);
          optionResponses.forEach((resp, index) => {
            const optionAnswers = resp.data.filter(
              (answer) => answer.answerText
            );
            const countMap = {};
            optionAnswers.forEach((answer) => {
              countMap[answer.answerText] =
                (countMap[answer.answerText] || 0) + 1;
            });
            optionResults[questions.optionQuestions[index].text] =
              Object.entries(countMap).map(([text, count]) => ({
                text,
                count,
              }));
          });
          console.log({ optionResults, freeInputResults });
          setResults({ optionResults, freeInputResults });
          setIsLoading(false);
        } catch (error) {
          setErr(error);
        }
      }
    };
    getResults();
  }, [questions, type]);

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
      <CardGrid className="wrapper-card-grid" />
      <div className="questions-container max-w-screen-md">
        {results && (
          <div>
            {Object.entries(results.optionResults).map(
              ([question, answers]) => (
                <div key={question} className="question text-center mb-8">
                  <h3>{question}</h3>
                  <ul className="text-customGreen">
                    {answers.map((answer, index) => (
                      <li key={index}>
                        {answer.text} - {answer.count}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
            {Object.entries(results.freeInputResults).map(
              ([question, answers]) => (
                <div key={question}>
                  <h2>{question}</h2>
                  <ul>
                    {answers.map((answer, index) => (
                      <li key={index}>{answer}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsPage;
