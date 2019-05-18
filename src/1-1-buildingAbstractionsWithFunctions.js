import React from "react";

// JavaScript provides the means for combining simple ideas to form more complex ideas:
// primitive expressions, which represent the simplest entities the language is concerned with
// means of combination, by which compound elements are built from simpler ones
// means of abstraction, by which compound elements can be named and manipulated as units.
// In programming, we deal with two kinds of elements: functions and data.
// Data is stuff that we want to manipulate, and functions are descriptions of the rules for manipulating the data

//+, -, * and / are left-associative.
const x = 5;
function mathStuff(x) {
  return 3 * 2 * (4 + (3 - 5)) + 10 * (27 / 6) * x;
}
const pi = 3.14159;
const radius = 10;
const circumference = 2 * pi * radius;
//Constant declarations are our language's simplest means of abstraction, for they allow us to use simple names to refer to the results of compound operations, such as the circumference computed above.

// To evaluate an operator combination, do the following:
// 1. Evaluate the operands of the combination.
// 2. Apply the function that is denoted by the operator to the arguments that are the values of the operands.

// The evaluation rule is recursive in nature; that is, it includes, as one of its steps, the need to invoke the rule itself.

function evalOp() {
  return (2 + 4 * 6) * (3 + 12); //390
  //Each expression is represented by a node with branches corresponding to the operator and the operands of the operator combination stemming from it.
  //The terminal nodes (that is, nodes with no branches stemming from them) represent either operators or numbers.
  //The values of the operands percolate upward, starting from the terminal nodes and then combining at higher and higher levels.
  //The 'percolate values upward' form of the evaluation rule is an example of a general kind of process known as tree accumulation.
  //         390
  //       /  |  \
  //     26   *  15
  //    /|\     /|\
  //   2 + 24  3 + 12
  //      /|\
  //     4 * 6
}

// function name(parameters) { return expression; }

function square(x) {
  return x * x;
}

function sumOfSquares(x, y) {
  return square(x) + square(y);
}

function addMultiply(x) {
  return [x + 1, x * 2];
}

let result = (a => sumOfSquares(...addMultiply(a)))(2); //25

//predicate ? consequent-expression : alternative-expression
//If the predicate evaluates to true, the interpreter then evaluates consequent-expression. Otherwise it evaluates alternative-expression.
function positiveOrNegative(x) {
  return x >= 0 ? "positive" : "negative";
  // |x| =  x   if x >= 0
  //       -x   otherwise
}

let a = true;
let b = false;
function xAndY(x, y) {
  return x && y ? "true" : "false";
}
function xOrY(x, y) {
  return x || y ? "true" : "false";
}
function xNotY(x, y) {
  return x === !y ? "true" : "false";
}
function notEqual(x, y) {
  return !(x >= y && x <= y) ? "true" : "false";
}

const ex12 = (5 + 4 + (2 - (3 - (6 + 4 / 5)))) / (3 * (6 - 2) * (2 - 7));
const ex13 = (x, y, z) =>
  x > y ? sumOfSquares(x, z) : x > z ? sumOfSquares(x, y) : sumOfSquares(y, z);
function plus(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function ex15(a, b) {
  return (b > 0 ? plus : minus)(a, b);
}

//We can define the square-root function as
// √𝑥 = the 𝑦 such that 𝑦≥0 and 𝑦2 = 𝑥

// We start with a value for the radicand (the number whose square root we are trying to compute) and a value for the guess.
// If the guess is good enough for our purposes, we are done; if not, we must repeat the process with an improved guess.
function abs(x) {
  return x >= 0 ? x : -x;
}
function ex17() {
  /*      
  The entire sqrt program can be viewed as a cluster of functions that mirrors the decomposition of the problem into subproblems.
  
           sqrt
             |
          sqrtIter
          /       \
    goodEnough   improve
      /  \           |
  square abs      average
  
  Each function accomplishes an identifiable task that can be used as a module in defining other functions
  A user should not need to know how the function is implemented in order to use it.

  */
  function average(x, y) {
    return (x + y) / 2;
  }
  function sqrt(x) {
    return sqrtIter(1.0, x);
  }
  function improve(guess, x) {
    return average(guess, x / guess);
  }
  function sqrtIter(guess, x) {
    return goodEnough(guess, x) ? guess : sqrtIter(improve(guess, x), x);
  }
  function goodEnough(guess, x) {
    return relativeError(guess, improve(guess, x)) < errorThreshold();
  }
  function relativeError(estimate, reference) {
    return abs(estimate - reference) / reference;
  }
  function errorThreshold() {
    return 0.01;
  }
  return sqrt(50);
}
function ex18() {
  function cube(x) {
    return x * x * x;
  }
  function goodEnough(guess, x) {
    return abs(cube(guess) - x) < 0.001;
  }
  function div3(x, y) {
    return (x + y) / 3;
  }
  function improve(guess, x) {
    return div3(x / (guess * guess), 2 * guess);
  }
  function cubeRoot(guess, x) {
    return goodEnough(guess, x) ? guess : cubeRoot(improve(guess, x), x);
  }
  return cubeRoot(2, 8);
}
const theAnswer = 42;
function theAnswer2() {
  return 42;
}
export function buildingAbstractionsWithFunctions() {
  return (
    <div>
      <div>buildingAbstractionsWithFunctions</div>
      <div>{mathStuff(x)}</div>
      <div>{circumference}</div>
      <div>{evalOp()}</div>
      <div>{square(4)}</div>
      <div>{(a => sumOfSquares(...addMultiply(a)))(10)}</div>
      <div>{result}</div>
      <div>{positiveOrNegative(14)}</div>
      <div>{positiveOrNegative(-14)}</div>
      <div>
        {xAndY(a, a)} {xAndY(a, b)} {xAndY(b, b)} {xAndY(b, a)}{" "}
      </div>
      <div>
        {xOrY(a, a)} {xOrY(a, b)} {xOrY(b, b)} {xOrY(b, a)}{" "}
      </div>
      <div>
        {xNotY(a, a)} {xNotY(a, b)} {xNotY(b, b)} {xNotY(b, a)}{" "}
      </div>
      <div>{notEqual(1, 5)}</div>
      <div>{ex12}</div>
      <div>{ex13(1, 2, 3)}</div>
      <div>{ex15(-15, -15)}</div>
      <div>{ex17()}</div>
      <div>{ex18()}</div>
      <div>{theAnswer}</div>
      <div>{theAnswer2()}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
    </div>
  );
}
