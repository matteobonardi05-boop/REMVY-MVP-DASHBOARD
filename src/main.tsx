import React from "react";
import { createRoot } from "react-dom/client";
import RemvyDashboardPrototype from "./RemvyDashboardPrototype";

createRoot(document.getElementById("dashboard-preview-root")!).render(
  <React.StrictMode>
    <RemvyDashboardPrototype />
  </React.StrictMode>,
);
