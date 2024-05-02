import React from "react";

function RadioButton({ value, questionText, handleOnChange }) {
  return (
    <label>
      {value}
      <input
        type="radio"
        id={value}
        name={questionText}
        value={value}
        onChange={handleOnChange}
      />
    </label>
  );
}

export default RadioButton;
