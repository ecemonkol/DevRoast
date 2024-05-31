// import React from "react";

// function RadioOption({ value, questionText, handleOnChange }) {
//   return (
//     <label>
//       {value}
//       <input
//         type="radio"
//         id={value}
//         name={questionText}
//         value={value}
//         onChange={handleOnChange}
//       />
//     </label>
//   );
// }

// export default RadioOption;

// RadioOption.js

import React from "react";

const RadioOption = ({ value, questionText, handleOnChange }) => {
  return (
    <label className="radio-label">
      <input
        type="radio"
        value={value}
        onChange={handleOnChange}
        className="radio-input"
        name={questionText}
      />
      <span className="radio-custom"></span>
      {value}
    </label>
  );
};

export default RadioOption;
