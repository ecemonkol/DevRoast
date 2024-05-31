import React from "react";
import cloud from "../assets/illustrations/cloud.png";
import questionmark from "../assets/illustrations/questionmark.png";
import saddonut from "../assets/illustrations/saddonut.png";
import round from "../assets/illustrations/round.png";
import plus from "../assets/illustrations/plus.png";
import star from "../assets/illustrations/star.png";

function NotFoundPage() {
  return (
    <div>
      <div className="flex f-column justify-between">
        <h1 className="text-giant passion-one-black mt-8 ml-8">PAGE</h1>
        <h1 className="text-giant passion-one-black mt-8 mr-8">NOT</h1>
      </div>

      <h1 className="text-giant passion-one-black absolute bottom-4 ml-8">
        FOUND
      </h1>

      <img
        src={questionmark}
        alt="Illustration"
        className="absolute top-20 mt-6 left-80 ml-40 z-10 "
        style={{
          width: "280px",
        }}
      />
      <img
        src={plus}
        alt="Illustration"
        className="absolute top-20 left-1/2 mt-8 ml-10 z-10 "
        style={{
          width: "240px",
        }}
      />
      <img
        src={star}
        alt="Illustration"
        className="absolute left-80 bottom-40 z-10 mb-8 "
        style={{
          width: "200px",
        }}
      />
      <img
        src={saddonut}
        alt="Illustration"
        className="absolute bottom-10 mt-6 right-1/3 z-10"
        style={{
          width: "460px",
        }}
      />
      <img
        src={cloud}
        alt="Illustration"
        className="absolute bottom-1/3 right-80 z-10 "
        style={{
          width: "220px",
        }}
      />
      <img
        src={round}
        alt="Illustration"
        className="absolute bottom-20 right-80 z-10 mr-16"
        style={{
          width: "160px",
        }}
      />
    </div>
  );
}

export default NotFoundPage;
