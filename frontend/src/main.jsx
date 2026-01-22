import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import No_Internet from "./components/ui/NoInternet.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <No_Internet />
        <ToastContainer />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
