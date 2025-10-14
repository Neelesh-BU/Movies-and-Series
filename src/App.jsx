import { SnackbarAndLoaderProvider } from "./components/Snackbar/SnackbarAndLoaderProvider.jsx";
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
          <div className="page-wrapper">
            <MainContent />
            <Footer />
          </div>
        </div>
      </SnackbarAndLoaderProvider>
    </ThemeProvider>
  );
}

export default App;
