import React from "react";
import { useState } from "react";

function AnswerForm({ handleOnSubmit }) {
  const [questionInput, setQuestionInput] = useState("");

  const handleOnChange = (e) => {
    setQuestionInput(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    handleOnSubmit(questionInput);
    setQuestionInput("");
  };

  return (
    <article className="main">
      <div>
        <b>Form</b>
        <form className="form" onSubmit={submitForm}>
          <label htmlFor="question">Type your question:</label>
          <input
            id="question"
            type="text"
            value={questionInput}
            onChange={handleOnChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </article>
  );
}

export default AnswerForm;
