import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { ExpenceTracker } from "./pages/expence-tracker/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expence-tracker" element={<ExpenceTracker />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
