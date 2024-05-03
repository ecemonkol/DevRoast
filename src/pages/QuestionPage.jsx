import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RadioOption from "../components/RadioOption";
const URLquestions = "https://questions-server.adaptable.app/questions";

function QuestionPage() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { order } = useParams();
  const [questionText, setQuestionText] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState(null);
  const [lastQuestionIndex, setLastQuestionIndex] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(`${URLquestions}?type=${type}&order=${order}`)
      .then((resp) => {
        setQuestionText(resp.data[0].text);
        setQuestionId(resp.data[0].id);
        setQuestionOptions(resp.data[0].options);
      })
      .catch((err) => setErr(err));
  }, [order, type]);

  useEffect(() => {
    axios
      .get(`${URLquestions}?type=${type}`)
      .then((resp) => {
        setLastQuestionIndex(resp.data.length);
        console.log(resp.data.length);
      })
      .catch((err) => setErr(err));
  }, [type]);

  const handleOnChange = (e) => {
    setAnswerInput(e.target.value);
  };
  const handleSendAnswer = () => {
    axios
      .get(`${URLquestions}/${questionId}`)
      .then((resp) => {
        const question = resp.data;
        if (!question.answers) {
          question.answers = [];
        }
        question.answers.push(answerInput);
        return axios.patch(`${URLquestions}/${questionId}`, question);
      })
      .then((resp) => {
        if (order != lastQuestionIndex) {
          const nextQuestion = parseInt(order) + 1;
          navigate(`/${type}/${nextQuestion}`);
        } else {
          navigate(`/${type}/loading`);
        }
      });
  };

  if (err)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        Opps, something went wrong.
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
      <div className="space-grotesk text-4xl px-4">{questionText}</div>
      {!questionOptions && (
        <input
          type="text"
          value={answerInput}
          onChange={handleOnChange}
          className="p-2 border border-gray-300 rounded-full w-64 h-16"
        />
      )}
      {questionOptions && (
        <div className="flex flex-col items-start space-y-2">
          {questionOptions.map((option) => (
            <div
              key={option}
              className="optionsQuestion"
              onChange={handleOnChange}
            >
              <RadioOption
                value={option}
                questionText={questionText}
                handleOnChange={handleOnChange}
              />
            </div>
          ))}
        </div>
      )}
      <button
        type="submit"
        onClick={handleSendAnswer}
        className="bg-customPink hover:bg-customPinkHover text-white font-bold px-6 rounded-full w-48 h-12 lexend-deca"
      >
        Next
      </button>
    </div>
  );
}

export default QuestionPage;

// "/"
// "/choose-avatar"
// "/choose-mode"
// "/choose-mode/instruction/:surveyID"
// "/choose-mode/:surveyID/start/:pageNumber"
