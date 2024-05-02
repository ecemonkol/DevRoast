import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://api.adviceslip.com/advice";
function LoadingPage() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        setAdvice(response.data.slip.advice); // Extract advice from the response object
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Random Advice:</h3>
      <p>{advice}</p>
    </div>
  );
}

export default LoadingPage;
