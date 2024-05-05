import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardDeck from "../components/CardDeck/CardDeck";
import LoadingPage from "./LoadingPage";

const URLanswers = "https://questions-server.adaptable.app/answers";

function ResultsPage() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState();
  const { surveyId } = useParams();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTotalUsers = () => {
      const URLusers = `https://questions-server.adaptable.app/users?_embed=answers&surveyId=${surveyId}`;
      axios
        .get(URLusers)
        .then((resp) => {
          const activeUsers = resp.data.filter(
            (user) => user.answers.length > 0
          );
          console.log(activeUsers);
          setTotalUsers(activeUsers.length);
        })
        .catch(() => {
          setErr(err);
          console.error("problem fetching total users", err);
        });
    };
    getTotalUsers();
  }, [surveyId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const resp = await axios.get(
          `https://questions-server.adaptable.app/surveys/${surveyId}?_embed=questions`
        );
        const allQuestions = resp.data.questions;
        setQuestions(allQuestions);
      } catch (error) {
        setErr(error);
      }
    };
    fetchQuestions();
  }, [surveyId]);

  const getFreeInputAnswers = (arr) => {
    return arr.map((answer) => {
      if (!answer.options) {
        return answer.answerText;
      }
    });
  };

  const getOptionAnswers = (arr) => {
    const optionResults = {};
    arr.forEach((answer) => {
      if (answer.options) {
        const answerText = answer.answerText;
        optionResults[answerText] = (optionResults[answerText] || 0) + 1;
      }
    });
    return optionResults;
  };

  useEffect(() => {
    if (questions) {
      const getResults = async () => {
        const promises = questions.map((question) =>
          axios.get(
            `${URLanswers}?surveyId=${surveyId}&questionId=${question.id}`
          )
        );
        try {
          let freeInputResults = {};
          let optionResults = {};

          const responses = await Promise.all(promises);
          responses.forEach((resp) => {
            if (!resp.data[0].options) {
              const questionText = resp.data[0].questionText;
              const answersArr = getFreeInputAnswers(resp.data);
              freeInputResults[questionText] = answersArr;
            } else {
              const questionText = resp.data[0].questionText;
              const optionAnswer = getOptionAnswers(resp.data);
              optionResults[questionText] = optionAnswer;
            }
          });
          console.log({ optionResults, freeInputResults });
          setResults({ optionResults, freeInputResults });
          setTimeout(() => {
            setIsLoading(false);
          }, 5000); // Display loading page for at least 5 seconds
        } catch (error) {
          setErr(error);
        }
      };
      getResults();
    }
  }, [questions, surveyId]);

  if (err)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        Opps, something went wrong.
      </div>
    );
  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 space-grotesk">
      <CardDeck />
      <div>TOTAL USERS: {totalUsers}</div>
      <div className="questions-container max-w-screen-md">
        {results && (
          <div>
            {Object.entries(results.optionResults).map(
              ([question, answers]) => {
                return (
                  <div key={question} className="question text-center mb-8">
                    <h3>{question}</h3>
                    <ul className="text-customGreen">
                      {Object.entries(answers).map(
                        ([answerText, count], index) => (
                          <li key={index}>
                            {answerText || "no answer"} - {count} (
                            {Math.round((count / totalUsers) * 100)}%)
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                );
              }
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
