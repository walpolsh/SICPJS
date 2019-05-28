import React from "react";
// The use of compound data leads to a real increase in the expressive power of our programming language.
// Consider the idea of forming a linear combination 𝑎𝑥+𝑏𝑦.
// We might like to write a function that would accept 𝑎, 𝑏, 𝑥, and 𝑦 as arguments and return the value of 𝑎𝑥+𝑏𝑦.
// This presents no difficulty if the arguments are to be numbers, because we can readily define the function
function linearCombination(a, b, x, y) {
  return a * x + b * y;
}

// But suppose we are not concerned only with numbers.
//Suppose we would like to describe a process that forms linear combinations whenever addition and multiplication are defined —
// for rational numbers, complex numbers, polynomials, or whatever // We could express this as a function of the form
function linearCombination2(a, b, x, y) {
  return add(mul(a, x), mul(b, y));
}
const add = x => x + x;
const mul = (x, y) => x * y;
/*
where add and mul are not the primitive functions + and * but rather more complex things that will perform 
the appropriate operations for whatever kinds of data we pass in as the arguments a, b, x, and y. 
The key point is that the only thing linear_combination should need to know about a, b, x, and y 
is that the functions add and mul will perform the appropriate manipulations. From the perspective of the function linear_combination, 
it is irrelevant what a, b, x, and y are and even more irrelevant how they might happen to be represented in terms of more primitive data. 
This same example shows why it is important that our programming language provide the ability to manipulate compound objects directly: 
Without this, there is no way for a function such as linear_combination to pass its arguments along to add and mul without having to know their detailed structure

*/
/*
We begin this chapter by implementing the rational-number arithmetic system mentioned above. 
This will form the background for our discussion of compound data and data abstraction. 
As with compound functions, the main issue to be addressed is that of abstraction as a technique for coping with complexity, 
and we will see how data abstraction enables us to erect suitable abstraction barriers between different parts of a program.
We will see that the key to forming compound data is that a programming language should provide some kind of glue so that 
data objects can be combined to form more complex data objects. There are many possible kinds of glue. 
Indeed, we will discover how to form compound data using no special data operations at all, only functions. 
This will further blur the distinction between function and data,

We will also explore some conventional techniques for representing sequences and trees. 
One key idea in dealing with compound data is the notion of closure—that the glue we use for 
combining data objects should allow us to combine not only primitive data objects, but compound data objects as well. 
Another key idea is that compound data objects can serve as conventional interfaces for combining program modules in mix-and-match ways.
We illustrate some of these ideas by presenting a simple graphics language that exploits closure.

We will then augment the representational power of our language by introducing symbolic expressions—data whose 
elementary parts can be arbitrary symbols rather than only numbers. We explore various alternatives for representing sets of objects. 
We will find that, just as a given numerical function can be computed by many different computational processes, 
there are many ways in which a given data structure can be represented in terms of simpler objects, 
and the choice of representation can have significant impact on the time and space requirements of processes that manipulate the data. 
We will investigate these ideas in the context of symbolic differentiation, the representation of sets, and the encoding of information.

Next we will take up the problem of working with data that may be represented differently by different parts of a program. 
This leads to the need to implement generic operations, which must handle many different types of data. 
Maintaining modularity in the presence of generic operations requires more powerful abstraction barriers than can be erected with simple data abstraction alone. 
In particular, we introduce data-directed programming as a technique that allows individual data representations 
to be designed in isolation and then combined additively (i.e., without modification). 
To illustrate the power of this approach to system design, we close the chapter by applying what we have learned 
to the implementation of a package for performing symbolic arithmetic on polynomials, in which the coefficients of the 
polynomials can be integers, rational numbers, complex numbers, and even other polynomials.

A function used as an element in creating a more complex function could be regarded not only 
as a collection of particular operations but also as a functional abstraction.
That is, the details of how the function was implemented could be suppressed, 
and the particular function itself could be replaced by any other function with the same overall behavior.
We could make an abstraction that would separate the way the function would be used from the details of how the function would be implemented in terms of more primitive functions. 
The analogous notion for compound data is called data abstraction. 
Data abstraction is a methodology that enables us to isolate how a compound data object is used from the details of how it is constructed from more primitive data objects.

The basic idea of data abstraction is to structure the programs that are to use compound data objects so that they operate on abstract data. 
That is, our programs should use data in such a way as to make no assumptions about the data that are not strictly necessary for performing the task at hand. 
At the same time, a concrete data representation is defined independent of the programs that use the data. 
The interface between these two parts of our system will be a set of functions, called selectors and constructors, that implement the abstract data in terms of the concrete representation. 
To illustrate this technique, we will consider how to design a set of functions for manipulating rational numbers.
*/

/*
Suppose we want to do arithmetic with rational numbers. We want to be able to add, subtract, multiply, and divide them and to test whether two rational numbers are equal.

Let us begin by assuming that we already have a way of constructing a rational number from a numerator and a denominator.
We also assume that, given a rational number, we have a way of extracting (or selecting) its numerator and its denominator. 
Let us further assume that the constructor and selectors are available as functions:

make_rat(n, d) returns the rational number whose numerator is the integer n and whose denominator is the integer d.
numer(x) returns the numerator of the rational number x.
denom(x) returns the denominator of the rational number x.
We are using here a powerful strategy of synthesis: wishful thinking. 
We haven't yet said how a rational number is represented, or how the functions numer, denom, and make_rat should be implemented. 
Even so, if we did have these three functions, we could then add, subtract, multiply, divide, and test equality by using the following relations:
𝑛1/𝑑1 + 𝑛2/𝑑2 = 𝑛1 / 𝑑2  + 𝑛2𝑑1 / 𝑑1𝑑2
𝑛1/𝑑1 − 𝑛2/𝑑2 = 𝑛1 / 𝑑2− 𝑛 2𝑑1 / 𝑑1𝑑2
𝑛1/𝑑1⋅𝑛2/𝑑2 = 𝑛1𝑛2/𝑑1𝑑2
𝑛1 /𝑑1𝑛2/𝑑2 = 𝑛1𝑑2/𝑑1𝑛2
𝑛1/𝑑1= 𝑛2/𝑑2 if and only if  𝑛1/𝑑2= 𝑛2/𝑑1
*/
const pair = (x, y) => ({ x, y });
const x = pair(1, 2);
const head = ({ x, y }) => x;
const tail = ({ x, y }) => y;
const make_rat = pair;
const numer = head;
const denom = tail;
function display(x) {
  return x;
}

function print_rat(x) {
  return display(numer(x) + "/" + denom(x));
}

function add_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) + numer(y) * denom(x),
    denom(x) * denom(y)
  );
}
function sub_rat(x, y) {
  return make_rat(
    numer(x) * denom(y) - numer(y) * denom(x),
    denom(x) * denom(y)
  );
}
function mul_rat(x, y) {
  return make_rat(numer(x) * numer(y), denom(x) * denom(y));
}
function div_rat(x, y) {
  return make_rat(numer(x) * denom(y), denom(x) * numer(y));
}
function equal_rat(x, y) {
  return numer(x) * denom(y) === numer(y) * denom(x);
}

const one_half = make_rat(1, 2);

print_rat(one_half);

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function make_rat2(n, d) {
  const g = gcd(n, d);
  return pair(n / g, d / g);
}

const rat2 = make_rat2(3, -4);

export const ArithmeticOperationsForRationalNumbers = (
  <div>
    <div>{linearCombination(12, 42, 1, 1)}</div>
    <div>{linearCombination2(12, 25, 24, 1)}</div>
    <div>{x.x + x.y}</div>
    <div>{rat2.y + rat2.y + rat2.x}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
  </div>
);
