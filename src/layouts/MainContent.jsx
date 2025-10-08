import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";

function MainContent() {
  return (
    <main className="App-content">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default MainContent;
