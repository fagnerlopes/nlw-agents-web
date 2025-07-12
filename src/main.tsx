import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app.tsx";

// biome-ignore lint/style/noNonNullAssertion: mandatory by React
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remover tela de loading estático assim que o React carrega
const loader = document.getElementById("initial-loader");
if (loader) {
  loader.remove();
}
