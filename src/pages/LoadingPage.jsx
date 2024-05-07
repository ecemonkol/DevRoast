import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://uselessfacts.jsph.pl/random.json?language=en";

function LoadingPage() {
  const [fact, setFact] = useState("");
  const { surveyId } = useParams();
  const [timerIsUp, setTimerIsUp] = useState(false);

  const getUserAvatar = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const avatar = storedUser.avatar;
    return avatar;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setFact(response.data.text);
      } catch (error) {
        navigate("*");
      }
    };

    fetchData();
    setTimeout(() => {
      setTimerIsUp(true);
    }, 8000);
  }, []);

  return (
    <div className="flex items-center justify-center mt-48 ">
      <div className="max-w-lg flex flex-col items-center space-grotesk">
        <h3 className="text-7xl text-center text-black ">
          Random Useless Fact:
        </h3>
        <p className="text-xl w-60p text-center mt-8 mb-8">{fact}</p>

        {!timerIsUp && getUserAvatar() && (
          <img
            src={getUserAvatar()}
            alt="avatar"
            width={120}
            className="animate-buzz-infinite"
          />
        )}
        {timerIsUp && (
          <Link to={`/${surveyId}/results`}>
            <button className="button-56 " role="button">
              Results are ready!
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default LoadingPage;
