import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ResultsPage() {
  const [results, setResults] = useState(null);
  const { type } = useParams();
  const URL = `https://questions-server.adaptable.app/users`;
  useEffect(() => {
    axios.get(URL).then((resp) => {
      console.log(resp.data);
      setResults(resp.data[0].answers);
    });
  }, []);
  return (
    <div>
      <h1>
        Question {order}: {answer}
      </h1>
    </div>
  );
}

export default ResultsPage;
