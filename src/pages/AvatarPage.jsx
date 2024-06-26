import React from "react";
import avatar1 from "../assets/avatars/avatar1.png";
import avatar2 from "../assets/avatars/avatar2.png";
import avatar3 from "../assets/avatars/avatar3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URLusers = "https://questions-server.adaptable.app/users";

function ChooseAvatar() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const newUser = {
      id: Date.now(),
      dateCreated: new Date().toISOString().slice(0, 10),
      avatar: e.target.src,
    };
    axios.post(URLusers, newUser).then((resp) => {
      navigate("/choose-mode");
      console.log("user created", resp);
    });
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl mb-4 space-grotesk">Choose your avatar</h1>
      <div className="flex justify-center mt-8">
        <img
          src={avatar1}
          alt="image1"
          onClick={handleClick}
          className="cursor-pointer transition duration-300 hover:scale-110"
          width={120}
        />
        <img
          src={avatar2}
          alt="image2"
          onClick={handleClick}
          className="cursor-pointer ml-4 transition duration-300 hover:scale-110"
          width={120}
        />
        <img
          src={avatar3}
          alt="image3"
          onClick={handleClick}
          className="cursor-pointer ml-4 transition duration-300 hover:scale-110"
          width={120}
        />
      </div>
    </div>
  );
}

export default ChooseAvatar;
