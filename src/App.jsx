// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home/Home";
import { SnackbarAndLoaderProvider } from "./components/Snackbar/SnackbarAndLoaderProvider.jsx";
// import UploadPage from "./pages/Upload/UploadPage";
import "./App.css";
import ThemeProvider from "./theme/index.jsx";

import Navbar from "./layouts/Navbar.jsx";
import Footer from "./layouts/Footer.jsx";
import MainContent from "./layouts/MainContent.jsx";

function App() {
  return (
    <ThemeProvider>
      <SnackbarAndLoaderProvider>
        <div className="App">
          <Navbar />
          <MainContent />
          <Footer />
        </div>
      </SnackbarAndLoaderProvider>
    </ThemeProvider>
  );
}

export default App;
