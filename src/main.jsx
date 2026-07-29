import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PlatformRoot from "./PlatformRoot";
import { initialiserBaseOfficielle } from "./services/initialisation";

initialiserBaseOfficielle();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlatformRoot />
  </StrictMode>
);