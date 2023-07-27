import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Hero_Component from "./Hero_Component";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Hero_Component />
  </StrictMode>,
  rootElement
);
