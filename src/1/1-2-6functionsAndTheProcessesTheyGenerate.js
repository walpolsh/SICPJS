import React from "react";
/*
A function is a pattern for the local evolution of a computational process. 
It specifies how each stage of the process is built upon the previous stage. 
We would like to be able to make statements about the overall, or global, behavior of a process whose local evolution has been specified by a function. 
This is very difficult to do in general, but we can at least try to describe some typical patterns of process evolution.

In this section we will examine some common shapes for processes generated by simple functions.
We will also investigate the rates at which these processes consume the important computational resources of time and space. 
The functions we will consider are very simple. 
Their role is like that played by test patterns in photography: as oversimplified prototypical patterns, rather than practical examples in their own right.
*/

/*
We begin by considering the factorial function, defined by:
𝑛!=𝑛⋅(𝑛−1)⋅(𝑛−2)⋯3⋅2⋅1
There are many ways to compute factorials. One way is to make use of the observation that 𝑛! is equal to 𝑛 times (𝑛−1)! for any positive integer 𝑛:
𝑛!=𝑛⋅[(𝑛−1)⋅(𝑛−2)⋯3⋅2⋅1]=𝑛⋅(𝑛−1)!
Thus, we can compute 𝑛! by computing (𝑛−1)! and multiplying the result by 𝑛. 
If we add the stipulation that 1! is equal to 1, this observation translates directly into a function:
*/
function factorial(n) {
  return n === 1 ? 1 : n * factorial(n - 1);
  /*
  The linear recursive process for computing factorial(6)
  factorial(6)
  6 * factorial(5)
  6 *(5 * factorial(4))
  6 *(5 *(4 * factorial(3)))
  6 *(5 *(4 *(3 * factorial(2))))
  6 *(5 *(4 *(3 * (2 * factorial(1)))))
  6 *(5 *(4 *(3 * (2 * 1)))))
  6 *(5 *(4 *(3 * 2)))
  6 *(5 *(4 * 6))
  6 *(5 * 24)
  6 * 120
  720
  The expansion occurs as the process builds up a chain of deferred operations (in this case, a chain of multiplications). 
  The contraction occurs as the operations are actually performed.
  This type of process, characterized by a chain of deferred operations, is called a recursive process. 
  Carrying out this process requires that the interpreter keep track of the operations to be performed later on. 
  In the computation of 𝑛!, the length of the chain of deferred multiplications, and hence the amount of information needed to keep track of it, grows linearly with 𝑛 (is proportional to 𝑛), just like the number of steps. 
  Such a process is called a linear recursive process.
  */
}

//Now let's take a different perspective on computing factorials.
//the counter and the product simultaneously change from one step to the next according to the rule:
// product ← counter ⋅ product
// counter ← counter + 1
function iterativeFactorial(n) {
  return factIter(1, 1, n);
}
function factIter(product, counter, maxCount) {
  return counter > maxCount
    ? product
    : factIter(counter * product, counter + 1, maxCount);
  /*
  A linear iterative process for computing iterativeFactorial(6)
  iterativeFactorial(6)
  factIter(1,1,6)
  factIter(1,2,6)
  factIter(2,3,6)
  factIter(6,4,6)
  factIter(24,5,6)
  factIter(120,6,6)
  factIter(720,7,6)
  720
  At each step, all we need to keep track of, for any 𝑛, are the current values of the names product, counter, and max_count. 
  We call this an iterative process. 
  In general, an iterative process is one whose state can be summarized by the values of a fixed number of state names, 
  together with a fixed rule that describes how the values of the state names should be updated as the process moves 
  from state to state and an (optional) end test that specifies conditions under which the process should terminate. 
  In computing 𝑛!, the number of steps required grows linearly with 𝑛. 
  Such a process is called a linear iterative process.
  */
}

/*
The contrast between the factorial and iterativeFactorial can be seen in another way.
In the iterative case, the values of the program names provide a complete description of the state of the process at any point. 
If we stopped the computation between steps, all we would need to do to resume the computation is to supply the interpreter with the values of the three program names. 
Not so with the recursive process. 
In this case there is some additional hidden information, maintained by the interpreter and not contained in the program names, which indicates where the process is in negotiating the chain of deferred operations. 
The longer the chain, the more information must be maintained.
*/
function ex19() {
  /*
    Each of the following two functions defines a method for adding two positive integers in terms of the functions inc, which increments its argument by 1, and dec, which decrements its argument by 1.
    Using the substitution model, illustrate the process generated by each function in evaluating plus(4,5);. Are these processes iterative or recursive?
 */
  function inc(a) {
    return a + 1;
  }
  function dec(a) {
    return a - 1;
  }
  //The process generated by the first procedure is recursive.

  function plus1(a, b) {
    return a === 0 ? b : inc(plus1(dec(a), b));
  }
  /*
  plus(4, 5)
  4 === 0 ? 5 : inc(plus(dec(4), 5))
  inc(plus(dec(4), 5))
  ...
  inc(plus(3, 5))
  ...
  inc(inc(plus(2, 5)))
  ...
  inc(inc(inc(plus(1, 5))))
  ...
  inc(inc(inc(inc(plus(0, 5)))))
  inc(inc(inc(inc( 0 === 0 ? 5 : inc(plus(dec(0), 5))))))
  inc(inc(inc(inc( 5 ))))
  inc(inc(inc( 6 )))
  inc(inc( 7 ))
  inc( 8 )
  9
  */
  //The process generated by the second procedure is iterative.
  function plus2(a, b) {
    return a === 0 ? b : plus2(dec(a), inc(b));
  }
  /*
  plus(4, 5)
  4 === 0 ? 5 : plus(dec(4), inc(5))
  plus(dec(4), inc(5))
  ...
  plus(3, 6)
  ...
  plus(2, 7)
  ...
  plus(1, 8)
  ...
  plus(0, 9)
  0 === 0 ? 9 : plus(dec(0), inc(9))
  9
  */
  return [plus1, plus2];
}
const [plus1, plus2] = ex19();

function ex110() {
  function Ackermann(x, y) {
    return y === 0
      ? 0
      : x === 0
      ? 2 * y
      : y === 1
      ? 2
      : Ackermann(x - 1, Ackermann(x, y - 1));
  }

  const [a, b, c] = [Ackermann(1, 10), Ackermann(2, 4), Ackermann(3, 3)];
  function f(n) {
    //f(n) is 2*n
    return Ackermann(0, n);
  }
  function g(n) {
    // g(n) is 2𝑛
    return Ackermann(1, n);
  }
  function h(n) {
    //h(n) is 2ℎ(𝑛−1) with h(0)=0, h(1)=2 respectively
    return Ackermann(2, n);
  }
  function k(n) {
    //k(n) computes 5𝑛2
    return 5 * n * n;
  }
  return [a, b, c, f, g, h, k];
}

const [a, b, c, f, g, h, k] = ex110();

/*
Another common pattern of computation is called tree recursion. As an example, consider computing the sequence of Fibonacci numbers, 
in which each number is the sum of the preceding two:
0,1,1,2,3,5,8,13,21,…
In general, the Fibonacci numbers can be defined by the rule
Fib(𝑛)=⎧ 0                     if 𝑛=0
       | 1                     if 𝑛=1
       ⎩ Fib(𝑛−1) + Fib(𝑛−2)   otherwise
We can immediately translate this definition into a recursive function for computing Fibonacci numbers:
*/
function fib(n) {
  return n === 0 ? 0 : n === 1 ? 1 : fib(n - 1) + fib(n - 2);
  /*
    Consider the pattern of this computation. 
    To compute fib(5) , we compute fib(4) and fib(3) . 
    To compute fib(4) , we compute fib(3) and fib(2) . 
    In general, the evolved process looks like a tree.
                            fib5
                fib4                       fib3
        fib3             fib2         fib2      fib1         
    fib2    fib1     fib1   fib0  fib1  fib0    1
  fib1 fib0   1       1       0      1     0
  0      1

  Notice that the branches split into two at each level (except at the bottom); 
  this reflects the fact that the fib function calls itself twice each time it is invoked.
  This function is instructive as a prototypical tree recursion, but it is a terrible way 
  to compute Fibonacci numbers because it does so much redundant computation. 
  Notice that the entire computation of fib(3)—almost half the work—is duplicated.
  In fact, it is not hard to show that the number of times the function will compute fib(1) or fib(0) 
  (the number of leaves in the above tree, in general) is precisely Fib(𝑛+1).
  To get an idea of how bad this is, one can show that the value of Fib(𝑛) grows exponentially with 𝑛.
  */

  //In general, the number of steps required by a tree-recursive process will be proportional to the number of nodes in the tree, while the space required will be proportional to the maximum depth of the tree.
}
//We can also formulate an iterative recursion process for computing the Fibonacci numbers.
//Use integers 𝑎 and 𝑏, initialized to Fib(1)=1 and Fib(0)=0,
// and to repeatedly apply the simultaneous transformations
//𝑎 ← 𝑎 + 𝑏
//b ← 𝑎

/* 

fib(n)
  fib(1,0,n)
    fibIter(a,b,count)
fib(2)
  fibIter(1,0,2)
    count !== 0 

*/
//After applying this transformation 𝑛 times, 𝑎 and 𝑏 will be equal, respectively, to Fib(𝑛+1) and Fib(𝑛)
function log(x) {
  console.log(x);
}
function fib2(n) {
  return fibIter(1, 0, n);
}
function fibIter(a, b, count) {
  return count === 0 ? b : fibIter(a + b, a, count - 1);
}

//How many different ways can we make change of $1.00, given half-dollars, quarters, dimes, nickels, and pennies?
//More generally, can we write a function to compute the number of ways to change any given amount of money?

function countChange(amount) {
  return cc(amount, 5);
}

function cc(amount, kindsOfCoins) {
  //If 𝑎 is exactly 0, we should count that as 1 way to make change.
  return amount === 0
    ? 1
    : //If 𝑎 is less than 0, we should count that as 0 ways to make change.
    amount < 0 || kindsOfCoins === 0
    ? //If 𝑛 (kindsOfCoins) is 0, we should count that as 0 ways to make change.
      0
    : cc(amount, kindsOfCoins - 1) +
      cc(amount - firstDenomination(kindsOfCoins), kindsOfCoins);
}

function firstDenomination(kindsOfCoins) {
  //takes as input the number of kinds of coins available and returns the denomination of the first kind.
  //Here we are thinking of the coins as arranged in order from largest to smallest, but any order would do as well.
  return kindsOfCoins === 1
    ? 1
    : kindsOfCoins === 2
    ? 5
    : kindsOfCoins === 3
    ? 10
    : kindsOfCoins === 4
    ? 25
    : kindsOfCoins === 5
    ? 50
    : 0;
}

function ex111() {
  //A function 𝑓 is defined by the rule that 𝑓(𝑛)=𝑛 if 𝑛<3 and 𝑓(𝑛)=𝑓(𝑛−1)+2𝑓(𝑛−2)+3𝑓(𝑛−3) if 𝑛≥3.
  //Write a JavaScript function that computes 𝑓 by means of a recursive process.
  //Write a function that computes 𝑓 by means of an iterative process.
  //iterative function
  function fIterative(n) {
    return n < 3 //𝑓(𝑛)=𝑛 if 𝑛< 3
      ? n
      : fIterativeImpl(2, 1, 0, n - 2);
  }
  function fIterativeImpl(a, b, c, count) {
    //𝑓(𝑛)=𝑓(𝑛−1)+2𝑓(𝑛−2)+3𝑓(𝑛−3) if 𝑛≥3
    return count === 0 ? a : fIterativeImpl(a + 2 * b + 3 * c, a, b, count - 1);
  }

  //recursive function

  function fRecursive(n) {
    // 𝑓(𝑛)=𝑛 if 𝑛< 3
    return n < 3
      ? n
      : //𝑓(𝑛)=𝑓(𝑛−1)+2𝑓(𝑛−2)+3𝑓(𝑛−3) if 𝑛≥3
        fRecursive(n - 1) + 2 * fRecursive(n - 2) + 3 * fRecursive(n - 3);
  }
  return [fIterative, fRecursive];
}

// Pascal's triangle.
// The numbers at the edge of the triangle are all 1, and each number inside the triangle is the sum of the two numbers above it.
function pascalTriangle(row, index) {
  return index > row
    ? false
    : index === 1 || index === row
    ? 1
    : pascalTriangle(row - 1, index - 1) + pascalTriangle(row - 1, index);
}

export function functionsAndTheProcessesTheyGenerate() {
  return (
    <div>
      functionsAndTheProcessesTheyGenerate
      <div>{factorial(6)}</div>
      <div>{iterativeFactorial(6)}</div>
      <div>{plus1(4, 4)}</div>
      <div>{plus2(4, 4)}</div>
      <div>
        {a} {b} {c}
      </div>
      <div>
        {f(4)} {g(4)} {h(4)} {k(4)}
      </div>
      <div>fib(4) {fib(4)}</div>
      <div>fib2(4) {fib2(171)}</div>
      <div>countChange= {countChange(10)}</div>
      <div>
        {ex111()[0](10)} {ex111()[1](10)}
      </div>
      <div>{pascalTriangle(8, 7)}</div>
      <div>{fibIter(14, 4848, 48)}</div>
      <div>{fibIter(14, 448, 48)}</div>
      <div>{fibIter(15, 18, 48)}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{`-----------------`}</div>
    </div>
  );
}
