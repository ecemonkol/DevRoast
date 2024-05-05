import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          navigate("/error");
        });
    } else {
      navigate("/error");
    }
  };

  const handleClick = (e) => {
    const surveyId = e.target.value;
    updateUser(+surveyId);
  };
  return (
    <div className="flex flex-col items-center mt-56 h-screen">
      <h1 className="text-5xl mb-4 space-grotesk">Choose the Mode</h1>
      <div className="flex flex-row mt-24">
        <button
          onClick={handleClick}
          value={1}
          className="button-56 mr-4"
          role="button"
        >
          Sarcastic mode
        </button>
        <button
          onClick={handleClick}
          value={2}
          className="button-56 mr-4"
          role="button"
        >
          Omar mode
        </button>
        <button
          onClick={handleClick}
          value={3}
          className="button-56"
          role="button"
        >
          Cute mode
        </button>
      </div>
    </div>
  );
}

export default ChooseMode;
