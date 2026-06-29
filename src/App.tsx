import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Form from "./Pages/Form";
import LeadsList from "./Pages/LeadsList";

// import Form from "./Form";
// import LeadsList from "./LeadsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/admin-secure-data-panel-2026-develop"
          element={<LeadsList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
