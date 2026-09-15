import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Projects from "./Pages/Projects.jsx";
import Processing from "./Pages/Processing.jsx";
import Reconstruction from "./Pages/Reconstructions.jsx";
import Results from "./Pages/Results.jsx";


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