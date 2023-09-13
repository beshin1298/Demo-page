import "./App.css";
import { Products } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
