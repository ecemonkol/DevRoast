// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = "https://api.adviceslip.com/advice";
// function LoadingPage() {
//   const [advice, setAdvice] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         console.log(response.data);
//         setAdvice(response.data.slip.advice);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h3>Random Advice:</h3>
//       <p>{advice}</p>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

function LoadingPage() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        setFact(response.data.text); // Extract fact from the response object
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Random Useless Fact:</h3>
      <p>{fact}</p>
    </div>
  );
}

export default LoadingPage;
