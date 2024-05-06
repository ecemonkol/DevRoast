import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function ChooseMode() {
  const URLusers = "https://questions-server.adaptable.app/users";
  const navigate = useNavigate();
  const updateUser = (surveyId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      localStorage.setItem("user", JSON.stringify({ ...storedUser, surveyId }));
      axios
        .patch(`${URLusers}/${storedUser.id}`, { ...storedUser, surveyId })
        .then(() => {
          navigate(`/${surveyId}/1`);
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          navigate("*");
        });
    } else {
      navigate("*");
    }
  };

  const handleClick = (e) => {
    const surveyId = e.target.value;
    updateUser(+surveyId);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl mb-4 space-grotesk">Choose the Mode</h1>
      <div className="flex flex-row mt-8">
        <button
          onClick={handleClick}
          value={1}
          className="button-56 mr-4"
          role="button"
        >
          Nerds
        </button>
        <button
          onClick={handleClick}
          value={2}
          className="button-56  mr-4"
          role="button"
        >
          Berlin
        </button>
        <button
          onClick={handleClick}
          value={3}
          className="button-56 flex-grow"
          role="button"
        >
          Countries
        </button>
      </div>
      <Link to="/">
        <button className="button-56  mt-24" role="button">
          Go Back
        </button>
      </Link>
    </div>
  );
}

export default ChooseMode;
