import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element }) => (
        <Route path={path} element={element} />
      ))}
    </Routes>
  </BrowserRouter>
);
