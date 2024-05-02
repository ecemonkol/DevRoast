import React from "react";

function RadioOption({ value, questionText, handleOnChange }) {
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

export default RadioOption;
