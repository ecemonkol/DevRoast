import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const URLquestions = "https://questions-server.adaptable.app/questions";
const URLanswers = "https://questions-server.adaptable.app/answers";

function QuestionPage() {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const { questionNum } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(`${URLquestions}?surveyId=${surveyId}`)
      .then((resp) => {
        setCurrentQuestion(resp.data[questionNum].text);
      })
      .catch((err) => setErr(err));
  }, [questionNum]);

  const handleOnChange = (e) => {
    setAnswerInput(e.target.value);
  };
  const handleSendAnswer = () => {
    const requestBody = {
      id: Date.now(),
      answer_text: answerInput,
      questionNum: +questionNum,
      surveyIdId: +surveyId,
    };
    axios.post(URLanswers, requestBody).then((resp) => {
      const nextQuestionNum = parseInt(questionNum) + 1;
      navigate(`/instructions/${surveyId}/${nextQuestionNum}`);
    });
  };

  if (err) return <div>Opps, something went wrong.</div>;
  return (
    <div>
      {currentQuestion}
      {questionNum !== "2" && (
        <input type="text" value={answerInput} onChange={handleOnChange} />
      )}
      {questionNum === "2" && (
        <div className="optionsQuestion" onChange={handleOnChange}>
          <div>
            <input
              type="radio"
              id="option1"
              name={`question${questionNum}`}
              value="email"
            />
            <label htmlFor="option1">DON'T REPEAT YOURSELF!</label>
            <input
              type="radio"
              id="option2"
              name={`question${questionNum}`}
              value="phone"
            />
            <label htmlFor="option2">just false</label>
            <input
              type="radio"
              id="option3"
              name={`question${questionNum}`}
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
