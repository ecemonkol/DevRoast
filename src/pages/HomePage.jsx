import React from "react";
import { Link } from "react-router-dom";
import cloud from "../assets/illustrations/cloud.png";
import questionmark from "../assets/illustrations/questionmark.png";
import donut from "../assets/illustrations/donut.png";
import round from "../assets/illustrations/round.png";
import plus from "../assets/illustrations/plus.png";
import starlink from "../assets/illustrations/starlink.png";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative z-10 flex flex-col items-center ">
        <h1 className=" text-giant passion-one-black text-center shadow-effect outline-text text-customBeige">
          DEV <br />
          ROAST!
        </h1>
        <div>
          <Link to="/instructions">
            <button className="button-56 mt-28" role="button">
              Start Roasting
            </button>
          </Link>
        </div>
      </div>
      {/* shapes */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2 ">
        <img
          src={questionmark}
          alt="Illustration"
          className="w-full animate-buzz-infinite"
          style={{
            width: "250px",
            marginLeft: "290px",
            marginTop: "40px",
            transform: "rotate(15deg)", // Rotate donut 180 degrees
          }}
        />
        <img
          src={cloud}
          alt="Illustration"
          className="w-full animate-floating"
          style={{
            width: "220px",
            marginTop: "70px",
            marginLeft: " 180px",
            transform: "rotate(90deg)", // Rotate donut 180 degrees
          }}
        />
        <Link to="https://github.com/ecemonkol/questions-app" target="_blank">
          <img
            src={starlink}
            alt="Illustration"
            cursor="pointer"
            className="w-full animate-spin-infinite"
            style={{
              width: "180px",
              marginLeft: "110px",
            }}
          />
        </Link>
        <img
          src={donut}
          alt="Illustration"
          className="w-full animate-jiggle-infinite"
          style={{
            width: "520px",
            marginTop: "50px",
            marginLeft: "40px",
          }}
        />
        <img
          src={plus}
          alt="Illustration"
          className="w-full animate-floating-diagonal"
          style={{
            width: "220px",
            marginLeft: "300px",
            marginBottom: "100px",
          }}
        />
        <img
          src={round}
          alt="Illustration"
          className="w-full animate-jump-and-fall"
          style={{
            width: "160px",
            marginTop: "60px",
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
