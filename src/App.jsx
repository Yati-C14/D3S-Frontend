import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Processing from "./pages/Processing.jsx";
import Reconstruction from "./pages/Reconstructions.jsx";
import Results from "./pages/Results.jsx";


function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/reconstruction" element={<Reconstruction />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  );
}

export default App;