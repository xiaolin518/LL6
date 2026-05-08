import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DataAnalysisCourse from "./pages/DataAnalysisCourse";
import PracticalTraining from "./pages/PracticalTraining";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/data-analysis" replace />} />
        <Route path="/data-analysis" element={<DataAnalysisCourse />} />
        <Route path="/data-analysis/practical" element={<PracticalTraining />} />
      </Routes>
    </Router>
  );
}
