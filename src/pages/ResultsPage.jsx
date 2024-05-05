import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardDeck from "../components/CardDeck/CardDeck";

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

  const sortQuestions = (questions) => {
    const optionQuestions = questions.filter((question) => question.options);
    const freeInputQuestions = questions.filter(
      (question) => !question.options
    );
    setQuestions({ optionQuestions, freeInputQuestions });
  };

  const filterAnswers = (arr) =>
    arr
      .filter((answer) => answer.answerText)
      .map((answer) => answer.answerText);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const resp = await axios.get(
          `https://questions-server.adaptable.app/surveys?type=${type}&_embed=questions`
        );
        const allQuestions = resp.data[0].questions;
        sortQuestions(allQuestions);
      } catch (error) {
        setErr(error);
      }
    };
    fetchQuestions();
  }, [type]);

  useEffect(() => {
    const getResults = async () => {
      if (questions.optionQuestions && questions.freeInputQuestions) {
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
            const answersArr = filterAnswers(resp.data);
            freeInputResults[questions.freeInputQuestions[index].text] =
              answersArr;
          });

          const optionResponses = await Promise.all(promisesOption);
          optionResponses.forEach((resp, index) => {
            const answersArr = filterAnswers(resp.data);
            const anwersWithCount = {};
            answersArr.forEach((answer) => {
              anwersWithCount[answer] = (anwersWithCount[answer] || 0) + 1;
            });
            optionResults[questions.optionQuestions[index].text] =
              anwersWithCount;
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
      <CardDeck />
      <div className="questions-container max-w-screen-md">
        {results && (
          <div>
            {Object.entries(results.optionResults).map(
              ([question, answers]) => (
                <div key={question} className="question text-center mb-8">
                  <h3>{question}</h3>
                  <ul className="text-customGreen">
                    {Object.entries(answers).map(
                      ([answerText, count], index) => (
                        <li key={index}>
                          {answerText} - {count}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
            {Object.entries(results.freeInputResults).map(
              ([question, answers]) => (
                <div key={question} className="question text-center mb-8">
                  <h2>{question}</h2>
                  <ul className="text-customGreen">
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
