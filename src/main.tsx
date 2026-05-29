import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import "./styles.css";

registerSW({
  immediate: true,
  onRegistered(registration) {
    if (registration) {
      console.info("[PWA] Service worker registered:", registration.scope);
    }
  },
  onRegisterError(error) {
    console.error("[PWA] Service worker registration failed:", error);
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
