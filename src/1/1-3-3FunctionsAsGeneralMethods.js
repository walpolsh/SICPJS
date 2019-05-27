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
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>----------------</div>
    </div>
  );
}
