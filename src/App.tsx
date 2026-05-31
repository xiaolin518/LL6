import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataAnalysisCourse from "./pages/DataAnalysisCourse";
import PracticalTraining from "./pages/PracticalTraining";
import ChapterPractice from "./pages/ChapterPractice";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-analysis" element={<DataAnalysisCourse />} />
        <Route path="/data-analysis/practical" element={<PracticalTraining />} />
        <Route path="/data-analysis/chapter/:chapterId" element={<ChapterPractice />} />
      </Routes>
    </Router>
  );
}
