import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CardGrid from "../components/CardDeck/CardGrid";
import { Link } from "react-router-dom";

const URLanswers = "https://questions-server.adaptable.app/answers";

const ResultsPage = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [results, setResults] = useState(null);
  const [questions, setQuestions] = useState();
  const { surveyId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTotalUsers = () => {
      const URLusers = `https://questions-server.adaptable.app/users?_embed=answers&surveyId=${surveyId}`;
      axios
        .get(URLusers)
        .then((resp) => {
          const activeUsers = resp.data.filter(
            (user) => user.answers.length > 0
          );
          setTotalUsers(activeUsers.length);
        })
        .catch(() => {
          console.error("problem fetching total users", err);
          navigate("*");
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
        navigate("*");
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
          setIsLoading(false);
          localStorage.removeItem("user");
        } catch (error) {
          navigate("*");
        }
      };
      getResults();
    }
  }, [questions, surveyId]);

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
    <div>
      <div className="flex justify-end px-4 mt-4 mr-4 space-grotesk">
        TOTAL USERS: {totalUsers}
      </div>
      <div className="flex flex-col items-center mt-2 h-screen px-4 space-grotesk">
        <CardGrid results={results} totalUsers={totalUsers} />

        <Link to="/choose-mode">
          <button className="button-56 mt-4" role="button">
            Start over
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
