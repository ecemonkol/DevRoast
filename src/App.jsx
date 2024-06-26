import "./App.css";
// import "./index.css";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import AvatarPage from "./pages/AvatarPage";
import HomePage from "./pages/HomePage";
import InstructionPage from "./pages/InstructionPage";
import LoadingPage from "./pages/LoadingPage";
import ResultsPage from "./pages/ResultsPage";
import QuestionPage from "./pages/QuestionPage";
import ChooseMode from "./pages/ChooseMode";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/choose-avatar" element={<AvatarPage />} />
        <Route path="/choose-mode" element={<ChooseMode />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/:surveyId/:order" element={<QuestionPage />} />
        <Route path="/:surveyId/loading" element={<LoadingPage />} />
        <Route path="/:surveyId/results" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
