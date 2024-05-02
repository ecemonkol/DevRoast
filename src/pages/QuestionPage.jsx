import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const URLquestions = "https://questions-server.adaptable.app/questions";
const URLanswers = "https://questions-server.adaptable.app/answers";

function QuestionPage() {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerInput, setAnswerInput] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(URLquestions + "/" + questionId)
      .then((resp) => setCurrentQuestion(resp.data.text))
      .catch((err) => setErr(err));
  }, [questionId]);

  const handleOnChange = (e) => {
    setAnswerInput(e.target.value);
  };
  const handleSendAnswer = () => {
    const requestBody = {
      id: Date.now(),
      answer_text: answerInput,
      questionId: +questionId,
    };
    axios.post(URLanswers, requestBody).then((resp) => {
      const nextQuestionId = parseInt(questionId) + 1;
      navigate(`/${nextQuestionId}`);
    });
  };

  if (err) return <div>Opps, something went wrong.</div>;
  return (
    <div>
      {currentQuestion}
      <input type="text" value={answerInput} onChange={handleOnChange} />

      <div className="optionsQuestion" onChange={handleOnChange}>
        <legend>
          If Omar were a function, what would his return statement be?
        </legend>
        <div>
          <input
            type="radio"
            id="option1"
            name={`question${questionId}`}
            value="email"
          />
          <label for="option1">DON'T REPEAT YOURSELF!</label>
          <input
            type="radio"
            id="option2"
            name={`question${questionId}`}
            value="phone"
          />
          <label for="option2">just false</label>
          <input
            type="radio"
            id="option3"
            name={`question${questionId}`}
            value="mail"
          />
          <label for="option3">Error</label>
        </div>
      </div>

      <button type="submit" onClick={handleSendAnswer}>
        Next
      </button>
    </div>
  );
}

export default QuestionPage;

// "/"
// "/choose-avatar"
// "/surveys"
// "/surverys/instruction/:surveyID"
// "/surveys/:surveyID/start/:pageNumber"
