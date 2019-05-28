import React from "react";
// functions used to express general methods of computation, independent of the particular functions involved.
// In this section we discuss two more elaborate examples—general methods for finding zeros and fixed points of functions
// and show how these methods can be expressed directly as functions.

//Finding roots of equations by the half-interval method
// The half - interval method is a simple but powerful technique for finding roots of an equation 𝑓(𝑥)=0, where 𝑓 is a continuous function.
// The idea is that, if we are given points 𝑎 and 𝑏 such that 𝑓(𝑎)< 0 <𝑓(𝑏), then 𝑓 must have at least one zero between 𝑎 and 𝑏.
// To locate a zero, let 𝑥 be the average of 𝑎 and 𝑏 and compute 𝑓(𝑥).If 𝑓(𝑥)> 0, then 𝑓 must have a zero between 𝑎 and 𝑥.
// If 𝑓(𝑥)< 0, then 𝑓 must have a zero between 𝑥 and 𝑏.Continuing in this way, we can identify smaller and smaller intervals
// on which 𝑓 must have a zero.When we reach a point where the interval is small enough, the process stops.
// Since the interval of uncertainty is reduced by half at each step of the process, the number of steps required grows as Θ(log(𝐿/𝑇)),
// where 𝐿 is the length of the original interval and 𝑇 is the error tolerance (that is, the size of the interval we will consider small enough).
// Here is a function that implements this strategy:[1]
let average = (x, y) => (x + y) / 2;

function search(f, neg_point, pos_point) {
  // we are initially given the function 𝑓 together with points at which its values are negative and positive
  const midpoint = average(neg_point, pos_point); // We first compute the midpoint of the two given points.
  if (closeEnough(neg_point, pos_point)) {
    //Next we check to see if the given interval is small enough,
    return midpoint; // and if so we simply return the midpoint as our answer.
  } else {
    const test_value = f(midpoint); //Otherwise, we compute as a test value the value of 𝑓 at the midpoint.
    if (positive(test_value)) {
      // If the test value is positive,
      return search(f, neg_point, midpoint); //then we continue the process with a new interval running from the original negative point to the midpoint.
    } else if (negative(test_value)) {
      // If the test value is negative,
      return search(f, midpoint, pos_point); //we continue with the interval from the midpoint to the positive point.
    } else {
      // Finally, there is the possibility that the test value is 0
      return midpoint; // in which case the midpoint is itself the root we are searching for.
    }
  }
}

function positive(x) {
  return x >= 0 ? true : false;
}
function negative(x) {
  return x < 0 ? true : false;
}

function closeEnough(x, y) {
  return Math.abs(x - y) < 0.001; // for computing square roots
}

// Search is awkward to use directly, because we can accidentally give it points at which 𝑓's values do not have the required sign,
// in which case we get a wrong answer. Instead we will use search via the following function,
// which checks to see which of the endpoints has a negative function value and which has a positive value,
// and calls the search function accordingly. If the function has the same sign on the two given points,
// the half-interval method cannot be used, in which case the function signals an error.

function halfIntervalMethod(f, a, b) {
  const aVal = f(a);
  const bVal = f(b);
  return negative(aVal) && positive(bVal)
    ? search(f, a, b)
    : negative(bVal) && positive(aVal)
    ? search(f, b, a)
    : console.error("values are not of opposite sign " + a + " " + b);
}
console.log(halfIntervalMethod(Math.sign, 4, -5));
// General utility function

// Finding fixed points of functions
// // A number 𝑥 is called a fixed point of a function 𝑓 if 𝑥 satisfies the equation 𝑓(𝑥)=𝑥.
// For some functions 𝑓 we can locate a fixed point by beginning with an initial guess and applying 𝑓 repeatedly,
// // 𝑓(𝑥), 𝑓(𝑓(𝑥)), 𝑓(𝑓(𝑓(𝑥))), …
// until the value does not change very much.Using this idea, we can devise a function fixed_point that takes as inputs
// a function and an initial guess and produces an approximation to a fixed point of the function.We apply the function repeatedly
// until we find two successive values whose difference is less than some prescribed tolerance:
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

// The fixed - point process is reminiscent of the process we used for finding square roots in Section 1.1.7.
// Both are based on the idea of repeatedly improving a guess until the result satisfies some criterion.
// In fact, we can readily formulate the square - root computation as a fixed - point search.
// Computing the square root of some number 𝑥 requires finding a 𝑦 such that 𝑦2 =𝑥.
// Putting this equation into the equivalent form 𝑦=𝑥/𝑦, we recognize that we are looking for a fixed point of the
// function[5] 𝑦↦𝑥/𝑦, and we can therefore try to compute square roots as
function sqrt(x) {
  return fixedPoint(y => average(y, x / y), 1.0);
}
//(Note that 𝑦 = 1 / 2 * ( 𝑦 + 𝑥 / 𝑦) is a simple transformation of the equation 𝑦=𝑥/𝑦;
//to derive it, add 𝑦 to both sides of the equation and divide by 2.)

function ex135() {
  //   Exercise 1.35
  //   Show that the golden ratio 𝜙 is a fixed point of the transformation 𝑥↦1 + 1 /𝑥,
  //   and use this fact to compute 𝜙 by means of the fixed_point function.
  //   The fixed point of the function is 1 + 1 /𝑥=𝑥
  //   Solving for x, we get 𝑥2 =𝑥+1 and 𝑥2−𝑥−1 = 0
  //   Using the quadratic equation to solve for x, we find that one of the roots of this equation is(1 +𝑠𝑞𝑟𝑡(5)) / 2,
  //   which is the golden ratio(approximately 1.618).
  function abs(x) {
    return x >= 0 ? x : -x;
  }
  //Using the quadratic equation to solve for x, we find that one of the roots of this equation is (1+𝑠𝑞𝑟𝑡(5))/2, which is the golden ratio (approximately 1.618).
  const tolerance = 0.00001;
  function fixedPoint(f, firstGuess) {
    function closeEnough(x, y) {
      return abs(x - y) < tolerance;
    }
    function tryWith(guess) {
      const next = f(guess);
      return closeEnough(guess, next) ? next : tryWith(next);
    }
    return tryWith(firstGuess);
  }
  console.log();
  return fixedPoint;
}
function ex137() {
  // An infinite continued fraction is an expression of the form
  // 𝑓 = 𝑁1 / 𝐷1 +𝑁2 / 𝐷2 +𝑁3𝐷3 + ⋯
  // As an example, one can show that the infinite continued fraction expansion with the 𝑁𝑖 and the 𝐷𝑖
  // all equal to 1 produces 1 /𝜙, where 𝜙 is the golden ratio(described in Section 1.2.2).
  // One way to approximate an infinite continued fraction is to truncate the expansion after a given number of terms.
  // Such a truncation—a so - called 𝑘-term finite continued fraction—has the form
  // 𝑁1 𝐷1 + 𝑁2 ⋱ + 𝑁𝐾 𝐷𝐾
  // Suppose that n and d are functions of one argument(the term index 𝑖) that return the 𝑁𝑖 and 𝐷𝑖 of the terms of the continued fraction.
  // Define a function cont_frac such that evaluating cont_frac(n, d, k) computes the value of the 𝑘-term finite continued fraction.
  // Check your function by approximating 1 /𝜙 using for successive values of k.
  // How large must you make k in order to get an approximation that is accurate to 4 decimal places?
  // If your cont_frac function generates a recursive process, write one that generates an iterative process.
  // If it generates an iterative process, write one that generates a recursive process.
  function contFracIter(n, d, k) {
    function iter(counter, result) {
      return counter === 0
        ? result
        : iter(counter - 1, counter / (counter + result));
    }
    return iter(k, 0);
  }
  function contFracRecur(n, d, k) {
    function recu(x, y) {
      return x === y ? x / y : x / (1 + recu(x + 1, y));
    }
    return recu(1, k);
  }
  return { contFracIter: contFracIter, contFracRecur: contFracRecur };
  //call the function and access with dot notation.
}

//accessing returned object with dot notation.
let lucky = x => x + "💵";
let fn2 = (fn, x) => ({ money: fn(x) });

const fn = (fn, a) => fn(a);

const res = fn(x => x + x, 3);

const add = x => x + x;
const res2 = fn(add, 3);

function add4000(x) {
  return x + 4000;
}
const res3 = fn(add4000, 3);

export function FunctionsAsGeneralMethods() {
  return (
    <div>
      <div>----------------</div>
      <div>FunctionsAsGeneralMethods</div>
      <div>{closeEnough(2, 4).toString()}</div>
      <div>{positive(1).toString()}</div>
      <div>{positive(0).toString()}</div>
      <div>{positive(-4).toString()}</div>
      <div>{negative(-4).toString()}</div>
      <div>{negative(4).toString()}</div>
      <div>{res}</div>
      <div>{res2}</div>
      <div>{res3}</div>
      <div>{halfIntervalMethod(Math.sign, 4, -5)}</div>
      we can use this method to approximate the fixed point of the cosine
      function, starting with 1 as an initial approximation{" "}
      <div>{fixedPoint(Math.cos, 1.0)}</div>
      Similarly, we can find a solution to the equation 𝑦=sin 𝑦 + cos 𝑦:
      <div>{fixedPoint(y => Math.sign(y) + Math.cos(y), 1.0)}</div>
      <div>{sqrt(16)}</div>
      <div>{ex135()(x => 277 + 0 / x, 1.0)}</div>
      <div>{ex135()(x => 277 + 1 / x, 1.0)}</div>
      <div>{ex135()(x => 277 + 2 / x, 1.0)}</div>
      <div>{ex135()(x => 277 + 3 / x, 1.0)}</div>
      <div>af{ex137().contFracIter(i => 1.0, i => 1.0, 2)}</div>
      <div>af{ex137().contFracRecur(i => 1.0, i => 1.0, 2)}</div>
      <div>lucky {fn2(lucky, "money").money}</div>
      <div>add4000 , 4 {fn2(add4000, 4).money.toString()}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>----------------</div>
    </div>
  );
}
