import React from "react";
const average = (x, y) => (x + y) / 2;
const tolerance = 0.00001;
function fixedPoint(f, firstGuess) {
  function closeEnough(x, y) {
    return Math.abs(x - y) < tolerance;
  }
  function tryWith(guess) {
    const next = f(guess);
    return closeEnough(guess, next) ? next : tryWith(next);
  }
  return tryWith(firstGuess);
}
// √𝑥 is a fixed-point of the function 𝑦 ↦ 𝑥/𝑦

// averageDamp is a function that takes as its argument a function f and returns as its value a function (produced by the function definition expression)
// that, when applied to a number x, produces the average of x and f(x).
// For example, applying average_damp to the square function produces a function whose value at some number 𝑥 is the average of 𝑥 and 𝑥2.
// Applying this resulting function to 10 returns the average of 10 and 100, or 55:
const averageDamp = f => x => average(x, f(x));
const square = x => x * 10;
const sqrt = x => fixedPoint(averageDamp(y => x / y), 1.0);
// Notice how this formulation makes explicit the three ideas in the method: fixed-point search, average damping, and the function 𝑦↦𝑥/𝑦.
// Bear in mind that these functions express the same process, and notice how much clearer the idea becomes when we express the process in terms of these abstractions.
// In general, there are many ways to formulate a process as a function. Experienced programmers know how to choose process formulations that are particularly perspicuous
// and where useful elements of the process are exposed as separate entities that can be reused in other applications.  As a simple example of reuse,

// notice that the cube root of 𝑥 is a fixed point of the function 𝑦↦𝑥/𝑦2, so we can immediately generalize our square-root function to one that extracts cube roots:
const cubeRoot = x => fixedPoint(averageDamp(y => x / square(y)), 1.0);

// Newton's method. If 𝑥 ↦ 𝑔 (𝑥) is a differentiable function, then a solution of the equation 𝑔 (𝑥) = 0 is
// a fixed point of the function 𝑥 ↦ 𝑓(𝑥) where 𝑓(𝑥) = 𝑥−𝑔(𝑥)/𝐷𝑔(𝑥) and 𝐷𝑔(𝑥) is the derivative of 𝑔 evaluated at 𝑥.
// Newton's method is the use of the fixed-point method we saw above to approximate a solution of the equation by finding a fixed point of the function 𝑓.
//For many functions 𝑔 and for sufficiently good initial guesses for 𝑥, Newton's method converges very rapidly to a solution of 𝑔(𝑥)=0.[4]

const deriv = g => x => (g(x + dx) - g(x)) / dx;
const dx = 0.00001;
// Like average_damp, deriv is a function that takes a function as argument and returns a function as value.For example, to approximate the derivative of 𝑥↦𝑥3 at 5(whose exact value is 75) we can evaluate

const cube = x => x * x * x;

deriv(cube)(5);
// This is the first time we encounter a function application whose function is not a name but a compound expression, in this case deriv(cube).
// To explain the evaluation of such applications, we extend the explanation given in Section 1.1.5 as follows.
// To evaluate an application combination of the form:
// expression(argument - expressions)
// the interpreter evaluates the elements of the combination and applies the function that results from evaluating expression to the arguments that result from evaluating argument - expressions).

// With the aid of deriv, we can express Newton's method as a fixed-point process:

const newtonTransform = g => x => x - g(x) / deriv(g)(x);

//In order to implement Newton's method as a function, we must first express the idea of derivative.
//Note that derivative, like average damping, is something that transforms a function into another function. For instance, the derivative of the function
// 𝑥↦𝑥3  is the function 𝑥↦3𝑥2. In general, if 𝑔 is a function and 𝑑𝑥 is a small number, then the derivative 𝐷𝑔 of 𝑔 is the function whose value at any number 𝑥 is given
// (in the limit of small 𝑑𝑥) by
// 𝐷𝑔(𝑥) = 𝑔(𝑥+𝑑𝑥) − 𝑔(𝑥) / 𝑑𝑥
// Thus, we can express the idea of derivative(taking 𝑑𝑥 to be, say, 0.00001) as the function
const newtonsMethod = (g, guess) => fixedPoint(newtonTransform(g), guess);
// The newton_transform function expresses the formula at the beginning of this section, and newtons_method is readily defined in terms of this.
// It takes as arguments a function that computes the function for which we want to find a zero, together with an initial guess.
// For instance, to find the square root of 𝑥, we can use Newton's method to find a zero of the function 𝑦↦𝑦2−𝑥 starting with an initial guess of 1.
// [5] This provides yet another form of the square-root function:

const sqrt2 = x => newtonsMethod(y => square(y) - x, 1.0);

//Abstractions and first-class functions
// We've seen two ways to express the square-root computation as an instance of a more general method, once as a fixed-point search and once using Newton's method.
// Since Newton's method was itself expressed as a fixed-point process, we actually saw two ways to compute square roots as fixed points.
// Each method begins with a function and finds a fixed point of some transformation of the function.
// We can express this general idea itself as a function:

const fixedPointOfTransform = (g, transform, guess) =>
  fixedPoint(transform(g), guess);
// This very general function takes as its arguments a function g that computes some function, a function that transforms g, and an initial guess.
// The returned result is a fixed point of the transformed function.
// Using this abstraction, we can recast the first square - root computation from this section
// (where we look for a fixed point of the average - damped version of 𝑦↦𝑥/𝑦) as an instance of this general method:

function sqrt3(x) {
  return fixedPointOfTransform(y => x / y, averageDamp, 1.0);
}

// Similarly, we can express the second square - root computation from this section
// (an instance of Newton's method that finds a fixed point of the Newton transform of 𝑦↦𝑦2−𝑥) as:

const sqrt4 = x =>
  fixedPointOfTransform(y => square(x) - y, newtonTransform, 1.0);

export const FunctionsAsReturnedValues = (
  <div>
    <div>-------------------------</div>
    <div>FunctionsAsReturnedValues</div>
    averageDamp(square)(2)
    <div>{averageDamp(square)(2)}</div>
    sqrt(4)
    <div>{sqrt(4)}</div>
    cubeRoot(10)
    <div>{cubeRoot(10)}</div>
    cubeRoot(1000)
    <div>{cubeRoot(1000)}</div>
    cubeRoot(10000000)
    <div>{cubeRoot(10000000)}</div>
    cubeRoot(125488)
    <div>{cubeRoot(125488)}</div>
    sqrt2(15)
    <div>{sqrt2(15)}</div>
    sqrt3(1125)
    <div>{sqrt3(1125)}</div>
    sqrt4(1)
    <div>{sqrt4(1)}</div>
    sqrt4(155125)sqrt4(155125)
    <div>{sqrt4(155125)}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
  </div>
);
