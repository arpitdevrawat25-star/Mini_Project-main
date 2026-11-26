import { StrictMode } from "react";
import { CareerProvider } from "./CarrierContext.tsx";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/app.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CareerProvider>
      <App />
    </CareerProvider>
  </StrictMode>,
);
