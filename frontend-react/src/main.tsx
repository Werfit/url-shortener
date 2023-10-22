import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/globals.css";
import { App } from "./app.component.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
