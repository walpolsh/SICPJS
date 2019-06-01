import React from "react";
/*

Alyssa P. Hacker is designing a system to help people solve engineering problems. 
One feature she wants to provide in her system is the ability to manipulate inexact quantities (such as measured parameters of physical devices) with known precision, 
so that when computations are done with such approximate quantities the results will be numbers of known precision.

Electrical engineers will be using Alyssa's system to compute electrical quantities. 
It is sometimes necessary for them to compute the value of a parallel equivalent resistance 𝑅𝑝 of two resistors 𝑅1 and 𝑅2 using the formula

𝑅𝑝= 1 / (1/𝑅1+1/𝑅2)

Resistance values are usually known only up to some tolerance guaranteed by the manufacturer of the resistor. 
For example, if you buy a resistor labeled 6.8 ohms with 10% tolerance you can only be sure that the resistor has a resistance between 6.8−0.68 =6.12 and 6.8+0.68 = 7.48 ohms. 
Thus, if you have a 6.8-ohm 10% resistor in parallel with a 4.7-ohm 5% resistor, the resistance of the combination can range from about 2.58 ohms 
(if the two resistors are at the lower bounds) to about 2.97 ohms (if the two resistors are at the upper bounds).

Alyssa's idea is to implement interval arithmetic as a set of arithmetic operations for combining intervals (objects that represent the range of possible values of an inexact quantity). 
The result of adding, subtracting, multiplying, or dividing two intervals is itself an interval, representing the range of the result.
*/

function upperBound(x) {
  return Math.ceil(x);
}

function lowerBound(x) {
  return Math.floor(x);
}

/*
  Alyssa postulates the existence of an abstract object called an interval that has two endpoints: a lower bound and an upper bound. 
  She also presumes that, given the endpoints of an interval, she can construct the interval using the data constructor make_interval. 
  Alyssa first writes a function for adding two intervals. 
  She reasons that the minimum value the sum could be is the sum of the two lower bounds and the maximum value it could be is the sum of the two upper bounds:
  */
function addInterval(x, y) {
  return makeInterval(
    lowerBound(x) + lowerBound(y),
    upperBound(x) + upperBound(y)
  );
}
/*
Alyssa also works out the product of two intervals by finding the minimum and the maximum of the products of the bounds and using them as the bounds of the resulting interval. 
(math_min and math_max are primitives that find the minimum or maximum of any number of arguments.)


*/
function mulInterval(x, y) {
  const p1 = lowerBound(x) * lowerBound(y);
  const p2 = lowerBound(x) * upperBound(y);
  const p3 = upperBound(x) * lowerBound(y);
  const p4 = upperBound(x) * upperBound(y);
  return makeInterval(Math.min(p1, p2, p3, p4), Math.max(p1, p2, p3, p4));
}
/*
To divide two intervals, Alyssa multiplies the first by the reciprocal of the second. 
Note that the bounds of the reciprocal interval are the reciprocal of the upper bound and the reciprocal of the lower bound, in that order.
*/

function divInterval(x, y) {
  return mulInterval(x, makeInterval(1.0 / upperBound(y), 1.0 / upperBound(y)));
}

function pair(x, y) {
  return [x, y];
}
function makeInterval(a, b) {
  return pair(a, b);
}
//it is not clear what it means to divide by an interval that spans zero.
//Modify the program to check for this condition and to signal an error if it occurs.

function log(x) {
  return console.log(x);
}
function divInteral2(x, y) {
  if (lowerBound(y) <= 0 && upperBound(y) >= 0) {
    return "Division error (interval spans 0)";
  } else {
    return mulInterval(
      x,
      makeInterval(1.0 / upperBound(y), 1.0 / lowerBound(y))
    );
  }
}
/*
After debugging her program, Alyssa shows it to a potential user, who complains that her program solves the wrong problem. 
He wants a program that can deal with numbers represented as a center value and an additive tolerance; 
for example, he wants to work with intervals such as 3.5±0.15 rather than [3.35,3.65]. 
Alyssa returns to her desk and fixes this problem by supplying an alternate constructor and alternate selectors:
*/
function makeCenterWidth(c, w) {
  return makeInterval(c - w, c + w);
}
function center(i) {
  return (lowerBound(i) + upperBound(i)) / 2;
}
function width(i) {
  return (upperBound(i) - lowerBound(i)) / 2;
}

//Define a constructor make_center_percent that takes a center and a percentage tolerance and produces the desired interval.
// You must also define a selector percent that produces the percentage tolerance for a given interval.
// The center selector is the same as the one shown above.

function makeCenterPercent(center, percent, width = center * (percent / 100)) {
  return makeCenterWidth(center, width);
}
function percent(i) {
  return (width(i) / center(i)) * 100;
}

/*
After considerable work, Alyssa P. Hacker delivers her finished system. 
Several years later, after she has forgotten all about it, she gets a frenzied call from an irate user, Lem E. Tweakit. 
It seems that Lem has noticed that the formula for parallel resistors can be written in two algebraically equivalent ways:
𝑅1𝑅2
𝑅1+𝑅2
and
1 / (1/𝑅1+1/𝑅2)
He has written the following two programs, each of which computes the parallel-resistors formula differently:
*/

function par1(r1, r2) {
  return divInteral2(mulInterval(r1, r2), addInterval(r1, r2));
}
function par2(r1, r2, one = makeInterval(1, 1)) {
  return divInteral2(
    one,
    addInterval(divInteral2(one, r1), divInteral2(one, r2))
  );
}
export function IntervalArithmetic() {
  return (
    <div>
      <div>---------------------</div>
      <div>IntervalArithmetic</div>
      <div>{upperBound(1.15)}</div>
      <div>{lowerBound(1.9)}</div>
      <div>{lowerBound(13.9)}</div>
      <div>{lowerBound(1.9) + lowerBound(1.9)}</div>
      <div>{addInterval(2, 5)}</div>
      <div>{divInteral2(1, 2)}</div>
      <div>{makeInterval(3, 4)}</div>
      <div>{makeCenterWidth(3, 5)}</div>
      <div>{makeCenterPercent(6.0, 10).join(" ")}</div>
      <div>{percent(15.45555)}</div>
      <div>{par1(1, 2)}</div>
      <div>{par2(1, 2)}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>---------------------</div>
    </div>
  );
}
