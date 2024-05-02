import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const URLquestions = "https://questions-server.adaptable.app/questions";

function QuestionPage() {
  const navigate = useNavigate();
  const { type } = useParams();
  const { order } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [questionOptions, setQuestionOptions] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(`${URLquestions}?order=${order}&type=${type}`)
      .then((resp) => {
        setCurrentQuestion(resp.data[0].text);
        setQuestionId(resp.data[0].id);
        console.log(resp.data[0].options);
        setQuestionOptions(resp.data[0].options);
      })
      .catch((err) => setErr(err));
  }, [order, type]);

  const handleOnChange = (e) => {
    setAnswerInput(e.target.value);
  };
  const handleSendAnswer = () => {
    axios
      .get(`${URLquestions}/${questionId}`)
      .then((resp) => {
        const question = resp.data;
        console.log(question);
        if (!question.answers) {
          question.answers = [];
        }
        question.answers.push(answerInput);
        return axios.patch(`${URLquestions}/${questionId}`, question);
      })
      .then((resp) => {
        const nextQuestion = parseInt(order) + 1;
        navigate(`/${type}/${nextQuestion}`);
      });
  };

  if (err) return <div>Opps, something went wrong.</div>;
  return (
    <div>
      {currentQuestion}
      {!questionOptions && (
        <input type="text" value={answerInput} onChange={handleOnChange} />
      )}
      {questionOptions && (
        <div className="optionsQuestion" onChange={handleOnChange}>
          <div>
            <input
              type="radio"
              id="option1"
              name={`question${order}`}
              value="email" //fetch from questions option
            />
            <label htmlFor="option1">DON'T REPEAT YOURSELF!</label>
            <input
              type="radio"
              id="option2"
              name={`question${order}`}
              value="phone"
            />
            <label htmlFor="option2">just false</label>
            <input
              type="radio"
              id="option3"
              name={`question${order}`}
              value="mail"
            />
            <label htmlFor="option3">Error</label>
          </div>
        </div>
      )}
      <button type="submit" onClick={handleSendAnswer}>
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
