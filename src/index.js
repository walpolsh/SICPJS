import React from "react";
import ReactDOM from "react-dom";
import { buildingAbstractionsWithFunctions } from "./1/1-1-buildingAbstractionsWithFunctions.js";
import { functionsAndTheProcessesTheyGenerate } from "./1/1-2-6functionsAndTheProcessesTheyGenerate.js";
import { OrdersOfGrowth } from "./1/1-2-3OrdersOfGrowth.js";
import { GreatestCommonDivisors } from "./1/1-2-5GreatestCommonDivisors.js";
import { FormulatingAbstractionsWithHigherFunctions } from "./1/1-3FormulatingAbstractionsWithHigherFunctions";
import { mergeSort } from "./mergeSort";
import "./styles.css";
const list = [9, 8, 7, 6, 5, 4, 3, 2, 1];
function App() {
  return (
    <div className="App">
      <div>{FormulatingAbstractionsWithHigherFunctions()}</div>
      <div>{buildingAbstractionsWithFunctions()}</div>;
      <div>{GreatestCommonDivisors()}</div>;<div>{OrdersOfGrowth()}</div>
      <div>{functionsAndTheProcessesTheyGenerate()}</div>
      <div>{mergeSort(list)}</div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
