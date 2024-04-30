import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import AnswerForm from "./components/AnswerForm";

function App() {
  const URL = "https://questions-server.adaptable.app/questions";
  const [questions, setQuestions] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshQuestions = () => {
    axios
      .get(URL)
      .then((resp) => setQuestions(resp.data))
      .catch((err) => setErr(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refreshQuestions();
  }, []);

  const handleOnSubmit = (questionInput) => {
    const requestBody = { id: Date.now(), text: questionInput };
    axios.post(URL, requestBody).then((resp) => {
      console.log(resp);
      refreshQuestions();
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (err) return <div>Opps!</div>;

  return (
    <>
      <div>
        <b>Questions</b>
        {questions.map((question) => {
          return <p key={question.id}> {question.text}</p>;
        })}
        <hr />
      </div>
      <AnswerForm
        refreshQuestions={refreshQuestions}
        handleOnSubmit={handleOnSubmit}
      />
      ;
    </>
  );
}

export default App;
