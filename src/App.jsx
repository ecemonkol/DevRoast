import "./App.css";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import AvatarPage from "./pages/AvatarPage";
import HomePage from "./pages/HomePage";
import InstructionPage from "./pages/InstructionPage";
import LoadingPage from "./pages/LoadingPage";
import ResultsPage from "./pages/ResultsPage";
import QuestionPage from "./pages/QuestionPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/choose-avatar" element={<AvatarPage />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/:questionId" element={<QuestionPage />} />
      </Routes>
    </>
  );
}

export default App;
