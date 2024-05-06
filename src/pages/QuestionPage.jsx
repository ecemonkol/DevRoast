import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RadioOption from "../components/RadioOption";
const URLquestions = "https://questions-server.adaptable.app/questions";
const URLanswers = "https://questions-server.adaptable.app/answers";
import shine1 from "../assets/illustrations/shine1.png";

function QuestionPage() {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const { order } = useParams();
  const [questionText, setQuestionText] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState(null);
  const [lastQuestionIndex, setLastQuestionIndex] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [attemptedEmptyAnswer, setAttemptedEmptyAnswer] = useState(false);
  const [answerTooLong, setAnswerTooLong] = useState(false);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    axios
      .get(`${URLquestions}?surveyId=${surveyId}&order=${order}`)
      .then((resp) => {
        setQuestionText(resp.data[0].text);
        setQuestionId(resp.data[0].id);
        setQuestionOptions(resp.data[0].options);
        setAttemptedEmptyAnswer(false);
        setAnswerTooLong(false);
        setTimer(10);
      })
      .catch((err) => setErr(err))
      .finally(() => setIsLoading(false));
  }, [order, surveyId]);

  useEffect(() => {
    if (timer === 0) {
      handleSendAnswer();
      setTimer(10);
    } else {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [timer]);

  useEffect(() => {
    axios
      .get(`${URLquestions}?surveyId=${surveyId}`)
      .then((resp) => {
        setLastQuestionIndex(resp.data.length);
      })
      .catch((err) => setErr(err));
  }, [surveyId]);

  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    setAnswerInput(inputValue);
    setAttemptedEmptyAnswer(!inputValue.trim());
    setAnswerTooLong(inputValue.length > 20);
  };

  const handleSendAnswer = () => {
    const storedUser = localStorage.getItem("user");
    const currentUser = JSON.parse(storedUser);
    if (!currentUser || !currentUser.id) {
      setErr(err);
      console.error("User ID not found.");
      return;
    }
    axios
      .get(`${URLanswers}?questionId=${questionId}&userId=${currentUser.id}`)
      .then((response) => {
        const answerExists = response.data.length > 0;
        const answerData = {
          questionId: parseInt(questionId),
          questionText: questionText,
          answerText: answerInput,
          userId: parseInt(currentUser.id),
          surveyId: parseInt(surveyId),
          options: Boolean(questionOptions),
        };
        if (answerExists) {
          const existingAnswer = response.data[0];
          axios
            .patch(`${URLanswers}/${existingAnswer.id}`, {
              answerText: answerInput,
            })
            .then((resp) => handleNextQuestion())
            .catch((error) => console.error("Error updating answer:", error));
        } else {
          axios
            .post(URLanswers, answerData)
            .then((resp) => handleNextQuestion())
            .catch((error) => console.error("Error saving answer:", error));
        }
      })
      .catch((error) => console.error("Error checking existing answer:", error))
      .finally(() => setAnswerInput(""));
  };

  const handleNextQuestion = () => {
    if (parseInt(order) !== lastQuestionIndex) {
      const nextQuestion = parseInt(order) + 1;
      navigate(`/${surveyId}/${nextQuestion}`);
      setAnswerInput("");
    } else {
      navigate(`/${surveyId}/results`);
    }
  };

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
    <div>
      <div className="h-4 mt-2 mx-2">
        <div
          className="h-full bg-black rounded-full"
          style={{ width: `${(order / (lastQuestionIndex + 1)) * 100}%` }}
        ></div>
      </div>
      <div className="flex flex-col items-center h-86vh ">
        <div className="mt-48 border-2 border-black p-10 rounded-lg custom-shadow relative">
          {/* Illustration */}
          <img
            src={shine1}
            alt="Illustration"
            className="absolute top-0 left-0 z-10 animate-floating"
            style={{
              width: "120px",
              height: "auto",
              top: "-30px",
              left: "-80px",
            }}
          />

          {/* Question Text */}
          <div className="space-grotesk text-2xl max-w-lg text-center mb-8 relative z-20">
            {questionText}
          </div>
          {!questionOptions && (
            <input
              type="text"
              value={answerInput}
              onChange={handleOnChange}
              className="p-2 border-2 border-black rounded-md w-40 h-12 text-center mx-auto"
              style={{ display: "block" }}
            />
          )}
          {attemptedEmptyAnswer && (
            <p className="text-red-500">Opps, I can't see your answer 😞</p>
          )}
          {answerTooLong && (
            <p className="text-red-500">Hehe, try a shorter answer 😉</p>
          )}
          {questionOptions && (
            <div className="flex flex-col items-start space-y-2">
              {questionOptions.map((option) => (
                <RadioOption
                  key={option}
                  value={option}
                  questionText={questionText}
                  handleOnChange={handleOnChange}
                />
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={handleSendAnswer}
          className="button-56 mt-12"
          role="button"
        >
          Next
        </button>
      </div>
      <div className="h-4 mb-2 mx-2 relative">
        <div
          className="absolute left-0 top-0 bottom-0 bg-customPink border-2 border-black rounded-full"
          style={{
            width: `${(10 - timer) * 10}%`,
            transition: (10 - timer) * 10 === 0 ? "none" : "width 1s linear",
          }}
        ></div>
      </div>
    </div>
  );
}

export default QuestionPage;

// "/"
// "/choose-avatar"
// "/choose-mode"
// "/choose-mode/instruction/:surveyID"
// "/choose-mode/:surveyID/start/:pageNumber"
