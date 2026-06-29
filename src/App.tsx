import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Form from "./Pages/Form";
import LeadsList from "./Pages/LeadsList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/form" element={<Form />} />
        <Route path="/leads" element={<LeadsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
