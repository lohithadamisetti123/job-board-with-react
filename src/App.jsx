import { Routes, Route } from "react-router-dom";
import JobBoardPage from "./pages/JobBoardPage";
import TrackerPage from "./pages/TrackerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobBoardPage />} />
      <Route path="/tracker" element={<TrackerPage />} />
    </Routes>
  );
}

export default App;
