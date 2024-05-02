import React from "react";
import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import { useNavigate } from "react-router-dom";

function ChooseAvatar() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const newUser = {
      id: Date.now(),
      avatar: e.target.src,
    };
    navigate("/choose-mode");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4 space-grotesk">Tell us who you are:</h1>
      <div className="flex justify-center">
        <img
          src={avatar1}
          alt="image1"
          onClick={handleClick}
          className="cursor-pointer"
          width={50}
        />
        <img
          src={avatar2}
          alt="image2"
          onClick={handleClick}
          className="cursor-pointer ml-4"
          width={50}
        />
        <img
          src={avatar3}
          alt="image3"
          onClick={handleClick}
          className="cursor-pointer ml-4"
          width={50}
        />
      </div>
    </div>
  );
}

export default ChooseAvatar;
