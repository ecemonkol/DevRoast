import React from "react";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center px-4">
      <p className="text-center max-w-screen-md space-grotesk">
        Welcome to Questions App - where surveys get a makeover! We're here to
        revolutionize the survey game by injecting a dose of fun and quirkiness
        into every question. Say goodbye to snooze-worthy surveys and hello to
        hilarious insights! Join us as we turn the mundane into the memorable,
        one witty question at a time. Let's make surveys fun again!
      </p>
      <a
        href="https://github.com/ecemonkol/questions-app"
        target="_blank"
        rel="noopener noreferrer"
        className="button-56"
        role="button"
      >
        GitHub Repo
      </a>
      <Link to="/">
        <button className="button-56" role="button">
          Back
        </button>
      </Link>
    </div>
  );
}

export default AboutPage;
