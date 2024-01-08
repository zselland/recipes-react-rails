import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.addEventListener("turbo:load", () => {
  console.log("react index loaded");
  const root = createRoot(
    document.getElementById('reactRoot')
  );
  root.render(<App />);
});