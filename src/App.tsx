import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DataAnalysisCourse from "./pages/DataAnalysisCourse";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data-analysis" element={<DataAnalysisCourse />} />
      </Routes>
    </Router>
  );
}
