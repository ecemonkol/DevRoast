
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
      <button type="submit" onClick={handleSendAnswer}>
        Next
      </button>
    </div>
  );
}

export default QuestionPage;
