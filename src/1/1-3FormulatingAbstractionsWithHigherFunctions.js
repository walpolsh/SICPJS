import React from "react";
function cube(x) {
  return x * x * x;
}

// The first computes the sum of the integers from a through b:
function sumIntegers(a, b) {
  return a > b ? 0 : a + sumIntegers(a + 1, b);
}

// The second computes the sum of the cubes of the integers in the given range which converges to 𝜋/8 (very slowly):[1]
function sumCubes(a, b) {
  return a > b ? 0 : cube(a + sumCubes(a + 1, b));
}
// The third computes the sum of a sequence of terms in the series 1/(1⋅3) + 1/(5⋅7) + 1/(9⋅11) + ... which converges to 𝜋/8 (very slowly)
function piSum(a, b) {
  return a > b ? 0 : 1.0 / (a * (a + 2)) + piSum(a + 4, b);
}

/* These three functions clearly share a common underlying pattern.
function name(a,b) {      //the name of the function
  return a > b
    ? 0: term(a)          //the function of a used to compute the term to be added
     + name(next(a),b)    //the function that provides the next value of a
}
The presence of such a common pattern is strong evidence that there is a useful abstraction waiting to be brought to the surface. 
Indeed, mathematicians long ago identified the abstraction of summation of a series and invented sigma notation, for example
∑𝑛=𝑎𝑏 𝑓(𝑛)=𝑓(𝑎)+⋯+𝑓(𝑏)
The power of sigma notation is that it allows mathematicians to deal with the concept of summation itself rather than only 
with particular sums — for example, to formulate general results about sums that are independent of the particular series being summed.
as program designers, we would like our language to be powerful enough so that we can write a function that expresses 
the concept of summation itself rather than only functions that compute particular sums. We can do so readily in our functional language 
by taking the common template shown above and transforming the 'slots' into parameters.

*/
function sum(term, a, next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b);
}

function inc(n) {
  return n + 1;
}

function sumCubes2(a, b) {
  return sum(cube, a, inc, b);
}
function identity(x) {
  return x;
}
function sumIntegers2(a, b) {
  return sum(identity, a, inc, b);
}

function piSum2(a, b) {
  function piTerm(x) {
    return 1.0 / (x * (x + 2));
  }
  function piNext(x) {
    return x + 4;
  }
  return sum(piTerm, a, piNext, b);
}

export function FormulatingAbstractionsWithHigherFunctions() {
  return (
    <div>
      <div>-------------------</div>
      <div>FormulatingAbstractionsWithHigherFunctions</div>
      <div>cube {cube(8)}</div>
      <div>cube {cube(347347)}</div>
      <div>cube {cube(346)}</div>
      <div>sumIntegers {sumIntegers(1, 4)}</div>
      <div>sumCubes {sumCubes(4, 2)}</div>
      <div>piSum {piSum(2, 7)}</div>
      <div>sumCubes2 {sumCubes2(115, 1117)}</div>
      <div>sumCubes2 {sumCubes2(2, 3)}</div>
      <div>sumIntegers2 {sumIntegers2(2, 3)}</div>
      <div>piSum2 {piSum2(2, 3)}</div>
      <div>piSum2 {piSum2(25, 167)}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>-------------------</div>
    </div>
  );
}
