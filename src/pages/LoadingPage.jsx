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
import { Link, useParams } from "react-router-dom";

const API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

function LoadingPage() {
  const [fact, setFact] = useState("");
  const { surveyId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setFact(response.data.text);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center mt-56 ">
      <div className="max-w-lg flex flex-col items-center space-grotesk">
        <h3 className="text-5xl text-center text-customGreen ">
          Random Useless Fact:
        </h3>
        <p className="text-xl w-60p text-center mt-8">{fact}</p>

        <Link to={`/${surveyId}/results`}>
          <button className="button-56 mt-12" role="button">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LoadingPage;
