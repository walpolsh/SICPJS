import React from "react";

function square(x) {
  return x * x;
}
function cube(x) {
  return x * x * x;
}

// The first computes the sum of the integers from a through b:
function sumIntegers(a, b) {
  return a > b ? 0 : a + sumIntegers(a + 1, b);
}

// The second computes the sum of the cubes of the integers `in` the given range which converges to 𝜋/8 (very slowly):[1]
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

function integral(f, a, b, dx) {
  function addDx(x) {
    return x + dx;
  }
  return sum(f, a + dx / 2, addDx, b) * dx;
}
// it seems terribly awkward to have to define trivial functions such as pi_term and pi_next just so we can use them as arguments
// to our higher - order function.Rather than define pi_next and pi_term, it would be more convenient to have a way to directly
// specify the function that returns its input incremented by 4 and the function that returns the reciprocal of its input times its input plus 2.
// We can do this by introducing function definition expressions that create functions.
// Using function definitions, we can describe what we want as
// x => x + 4;
// and
// x => 1.0 / (x * (x + 2));

function piSum3(a, b) {
  return sum(
    x => 1.0 / (x * (x + 2)), //piTerm
    a,
    x => x + 4, //piNext
    b
  );
}

function integral2(f, a, b, dx) {
  return sum(f, a + dx / 2.0, x => x + dx, b) * dx;
}

// In general, function definitions are used to create functions similarly to function declarations, except that no name is specified for the function[1]
// and the return keyword along with the curly braces can be omitted.
// (parameters) => expression
// The resulting function is just as much a function as one that is created using a function definition statement.
// The only difference is that it has not been associated with any name in the environment.In fact,
function plus4a(x) {
  return x + 4;
}
//is equivalent to
const plus4b = x => x + 4;
// the function plus4b with argument x results in the value plus 4

//Using const to create local names
// For example, suppose we wish to compute the function
// 𝑓(𝑥, 𝑦)=𝑥(1 +𝑥𝑦) 2 +𝑦(1−𝑦) +(1 +𝑥𝑦) (1−𝑦)
// which we could also express as
function f(x, y) {
  function fHelper(a, b) {
    return x * square(a) + y * b + a * b;
  }
  return fHelper(1 + x * y, 1 - y);
}

// Of course, we could use a function definition expression to specify an anonymous function for binding our local names.
// The body of f then becomes a single call to that function:

function f2(x, y) {
  return ((a, b) => x * square(a) + y * b + a * b)(1 + x * y, 1 - y);
}

//A more convenient way to define local names is by using const within the body of the function. Using const, the function f can be written as:
function f3(x, y) {
  const a = 1 + x * y;
  const b = 1 - y;
  return x * square(a) + y * b + a * b;
}

//When functions become big, it will contribute to their readability if we keep the scope of the names as narrow as possible. Consider for example expmod:
function isEven(x) {
  return x % 2 === 0;
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : isEven(exp)
    ? (expmod(base, exp / 2, m) * expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}
//This function is unnecessarily inefficient, because it contains two identical calls of expmod(base, exp / 2, m).
// While this can be easily fixed in this example using the square function, this is not so easy in general.
// Without using square, we would be tempted to introduce a local name for the expression as follows:

function expmod2(base, exp, m) {
  const toHalf = expmod2(base, exp / 2, m); //the constant declaration appears outside the conditional expression, it is executed even when the base case exp === 0 is reached
  return exp === 0
    ? 1
    : isEven(exp)
    ? (toHalf * toHalf) % m
    : (base * expmod2(base, exp - 1, m)) % m;
}

//This would make the function not just inefficient, but actually non-terminating!
// The problem is that the constant declaration appears outside the conditional expression, which means that it is executed even when the base case exp === 0 is reached.
// To avoid this situation, we shall provide for conditional statements, and allow for return statements to appear in several branches of the statement.
// Using a conditional statement, the function expmod can be written as follows:
function expmod3(base, exp, m) {
  if (exp === 0) {
    return 1;
  } else {
    if (isEven(exp)) {
      const toHalf = expmod3(base, exp / 2, m);
      return (toHalf * toHalf) % m;
    } else {
      return (base * expmod3(base, exp - 1, m)) % m;
    }
  }
}
// The general form of a conditional statement is
// if (predicate) { consequent - statement } else { alternative - statement }
// and, like conditional expressions, their evaluation first evaluates the predicate.
// If it evaluates to true, the interpreter evaluates the consequent - statement and otherwise the alternative - statement.
// Note that any constant declarations occurring in either statement are local to that statement, because both are enclosed in curly braces and thus form their own block.

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
      <div>integral {integral(cube, 0, 1, 0.1)}</div>
      <div>{integral2(cube, 1, 42, 24)}</div>
      <div>
        {plus4a(124)} {plus4b(124)}
      </div>
      <div>{((x, y, z) => x + y + square(z))(1, 2, 3)}</div>
      <div>{f(12, 1)}</div>
      <div>{f2(12, 1)}</div>
      <div>{f3(12, 1)}</div>
      <div>{expmod(4, 3, 5)}</div>
      {/* <div>{expmod2(4, 3, 5)}</div> */}
      <div>{expmod3(4, 3, 5)}</div>
      <div>{}</div>
      <div>-------------------</div>
    </div>
  );
}
