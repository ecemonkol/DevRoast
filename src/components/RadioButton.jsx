import React from "react";

function RadioButton({ value }) {
  return (
    <label>
      DON'T REPEAT YOURSELF!
      <input
        type="radio"
        id={value}
        name={`question${order}`}
        value={value} //fetch from questions option
      />
    </label>
  );
}

export default RadioButton;
