import React from "react";
/*
  We began the rational-number implementation in Section 2.1.1 by implementing the rational-number operations add_rat, sub_rat, 
  and so on in terms of three unspecified functions: make_rat, numer, and denom. 
  At that point, we could think of the operations as being defined in terms of data objects—numerators, denominators, 
  and rational numbers—whose behavior was specified by the latter three functions.
  
  But exactly what is meant by data? It is not enough to say whatever is implemented by the given selectors and constructors. 
  Clearly, not every arbitrary set of three functions can serve as an appropriate basis for the rational-number implementation. 
  We need to guarantee that, if we construct a rational number x from a pair of integers n and d, then extracting 
  the numer and the denom of x and dividing them should yield the same result as dividing n by d. 
  In other words, make_rat, numer, and denom must satisfy the condition that, for any integer n and any non-zero integer d, if x is make_rat(n,d), then
  𝚗𝚞𝚖𝚎𝚛(𝚡)/𝚍𝚎𝚗𝚘𝚖(𝚡) = 𝚗/𝚍
  
  In fact, this is the only condition make_rat, numer, and denom must fulfill in order to form a suitable basis for a rational-number representation. 
  In general, we can think of data as defined by some collection of selectors and constructors, 
  together with specified conditions that these functions must fulfill in order to be a valid representation.
  
  This point of view can serve to define not only high-level data objects, such as rational numbers, but lower-level objects as well. 
  Consider the notion of a pair, which we used in order to define our rational numbers. 
  We never actually said what a pair was, only that the language supplied functions pair, head, and tail for operating on pairs. 
  But the only thing we need to know about these three operations is that if we glue two objects together using pair we can retrieve the objects using head and tail. 
  That is, the operations satisfy the condition that, for any objects x and y, if z is pair(x, y) then head(z) is x and tail(x) is y. 
  Indeed, we mentioned that these three functions are included as primitives in our language. 
  However, any triple of functions that satisfies the above condition can be used as the basis for implementing pairs. 
  This point is illustrated strikingly by the fact that we could implement pair, head, and tail without using any data structures at all but only using functions. 
  Here are the definitions:
*/
function pair(x, y) {
  function dispatch(m) {
    return m === 0 ? x : m === 1 ? y : `arguement not 0 or 1 -- pair ${m}`;
  }
  // the value returned by pair(x, y) is a function—namely the internally defined function dispatch,
  // which takes one argument and returns either x or y depending on whether the argument is 0 or 1.
  return dispatch;
}
function head(z) {
  // Correspondingly, head(z) is defined to apply z to 0. Hence, if z is the function formed by pair(x, y), then z applied to 0 will yield x.
  // Thus, we have shown that head(pair(x, y)) yields x, as desired.
  return z(0);
}
function tail(z) {
  // Similarly, tail(pair(x, y)) applies the function returned by pair(x, y) to 1, which returns y.
  return z(1);
}
// Therefore, this functional implementation of pairs is a valid implementation, and if we access pairs using only pair, head, and tail we cannot distinguish this implementation from one that uses real data structures.

// This use of functions corresponds to nothing like our intuitive notion of what data should be.
// Nevertheless, all we need to do to show that this is a valid way to represent pairs is to verify that these functions satisfy the condition given above.
// The point of exhibiting the functional representation of pairs is not that our language works this way (we will be using arrays to represent pairs) but that it could work this way.
// The functional representation, although obscure, is a perfectly adequate way to represent pairs, since it fulfills the only conditions that pairs need to fulfill.
// This example also demonstrates that the ability to manipulate functions as objects automatically provides the ability to represent compound data.
// This may seem a curiosity now, but functional representations of data will play a central role in our programming repertoire.
// This style of programming is often called message passing, and we will be using it as a basic tool in Chapter 3 when we address the issues of modeling and simulation.

let pair1 = pair(515, 224);

function ex240() {
  //Here is an alternative functional representation of pairs. For this representation, verify that head(pair(x, y)) yields x for any objects x and y.
  function pair(x, y) {
    return m => m(x, y);
  }
  const pair2 = pair(1, 2);
  function head(z) {
    return z((p, q) => p);
  }
  function tail(z) {
    return z((p, q) => q);
  }

  return [head(pair2), tail(pair2)];
}
function square(x) {
  return x * x;
}
function ex250() {
  //Show that we can represent pairs of nonnegative integers using only numbers and arithmetic operations if we represent
  //the pair 𝑎 and 𝑏 as the integer that is the product 2^𝑎 * 3^𝑏. Give the corresponding definitions of the functions pair, head, and tail.
  function fastExpt(b, n) {
    return fastExptIter(b, n, 1);
  }
  function fastExptIter(b, n, a) {
    return n === 0
      ? a
      : n % 2 === 0
      ? fastExptIter(square(b), n / 2, a)
      : fastExptIter(b, n - 1, a * b);
  }
  function myPair(a, b) {
    return fastExpt(2, a) * fastExpt(3, b);
  }
  function myHead(p) {
    return p % 2 === 0 ? myHead(p / 2) + 1 : 0;
  }

  function myTail(p) {
    return p % 3 === 0 ? myTail(p / 3) + 1 : 0;
  }
  let pair3 = myPair(1, 2);
  return [myHead(pair3), myTail(pair3)];
}

function ex260() {
  //In case representing pairs as functions wasn't mind-boggling enough, consider that, in a language that can manipulate functions, we can get by without numbers
  //(at least insofar as nonnegative integers are concerned) by implementing 0 and the operation of adding 1
  //This representation is known as Church numerals, after its inventor, Alonzo Church, the logician who invented the 𝜆 calculus.
  //Define one and two directly (not in terms of zero and add_1).
  //(Hint: Use substitution to evaluate add_1(zero)).
  //Give a direct definition of the addition function + (not in terms of repeated application of add_1).
}
export const WhatIsMeantByData = (
  <div>
    <div>--------------------------</div>
    <div>WhatIsMeantByData?</div>
    pair(51, 2)(0)
    <div>{pair(51, 2)(0)}</div>
    pair(1, 2)(1)
    <div>{pair(1, 2)(1)}</div>
    pair(1, 4)(1)
    <div>{pair(1, 4)(1)}</div>
    head(pair1)
    <div>{head(pair1)}</div>
    tail(pair1)
    <div>{tail(pair1)}</div>
    ex240()[0] ex240()[1]
    <div>
      {ex240()[0]} {ex240()[1]}
    </div>
    ex250()[0] ex250()[0]
    <div>
      {ex250()[0]} {ex250()[0]}
    </div>
    <div>{}</div>
    <div>--------------------------</div>
  </div>
);
