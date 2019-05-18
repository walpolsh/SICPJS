import React from "react";
import ReactDOM from "react-dom";
import { buildingAbstractionsWithFunctions } from "./1-1-buildingAbstractionsWithFunctions.js";
import { functionsAndTheProcessesTheyGenerate } from "./1-2-functionsAndTheProcessesTheyGenerate.js";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <div>{functionsAndTheProcessesTheyGenerate()}</div>
      <div>{buildingAbstractionsWithFunctions()}</div>;
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
