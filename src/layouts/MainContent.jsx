import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy import Home
const Home = lazy(() => import("../pages/Home/Home"));

function MainContent() {
  return (
    <main className="App-content">
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default MainContent;
