import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RadioOption from "../components/RadioOption";
const URLquestions = "https://questions-server.adaptable.app/questions";
const URLusers = "https://questions-server.adaptable.app/users";

function QuestionPage() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { order } = useParams();
  const [questionText, setQuestionText] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState(null);
  const [lastQuestionIndex, setLastQuestionIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerInput, setAnswerInput] = useState("");
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${URLquestions}?type=${type}&order=${order}`)
      .then((resp) => {
        setQuestionText(resp.data[0].text);
        setQuestionId(resp.data[0].id);
        setQuestionOptions(resp.data[0].options);
      })
      .catch((err) => setErr(err))
      .finally(() => setIsLoading(false));
  }, [order, type]);

  useEffect(() => {
    axios
      .get(`${URLquestions}?type=${type}`)
      .then((resp) => {
        setLastQuestionIndex(resp.data.length);
      })
      .catch((err) => setErr(err));
  }, [type]);

  const handleOnChange = (e) => {
    setAnswerInput(e.target.value);
  };

  const handleSendAnswer = () => {
    const storedUser = localStorage.getItem("user");
    const currentUser = JSON.parse(storedUser);
    const newAnswer = {
      questionId: questionId,
      questionText: questionText,
      text: answerInput,
    };

    axios.get(`${URLusers}/${currentUser.id}`).then((resp) => {
      const user = resp.data;
      if (!user.answers) {
        user.answers = [newAnswer];
      } else {
        user.answers.push(newAnswer);
      }

      axios
        .patch(`${URLusers}/${currentUser.id}`, { answers: user.answers })
        .then((resp) => {
          if (order == lastQuestionIndex) {
            console.log("lastQuestion", order == lastQuestionIndex);
            navigate(`/${type}/loading`);
          } else {
            const nextQuestion = parseInt(order) + 1;
            navigate(`/${type}/${nextQuestion}`);
          }
        });
    });
  };

  if (err)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        Opps, something went wrong.
      </div>
    );
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
        Loading...
      </div>
    );
  return (
    <div>
      <div className="h-2 bg-gray-100 w-full">
        <div
          className="h-full bg-customBlue rounded-full"
          style={{ width: `${(order / (lastQuestionIndex + 1)) * 100}%` }}
        ></div>
      </div>
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
              <RadioOption
                key={option}
                value={option}
                questionText={questionText}
                handleOnChange={handleOnChange}
              />
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
    </div>
  );
}

export default QuestionPage;

// "/"
// "/choose-avatar"
// "/choose-mode"
// "/choose-mode/instruction/:surveyID"
// "/choose-mode/:surveyID/start/:pageNumber"
