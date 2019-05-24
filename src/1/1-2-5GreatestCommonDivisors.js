import React from "react";

// The greatest common divisor (GCD) of two integers 𝑎 and 𝑏 is defined to be the largest integer that divides both 𝑎 and 𝑏 with no remainder.

// GCD(𝑎, 𝑏) = GCD(𝑏, 𝑟)
// if 𝑟 is the remainder when 𝑎 is divided by 𝑏, then the common divisors of 𝑎 and 𝑏 are precisely the same as the common divisors of 𝑏 and 𝑟.
// to successively reduce the problem of computing a GCD to the problem of computing the GCD of smaller and smaller pairs of integers.
// For example
//   GCD(206, 40)
//   GCD(40, 6)
//   GCD(6, 4)
//   GCD(4, 2)
//   GCD(2, 0)
//   2
//This generates an iterative process, whose number of steps grows as the logarithm of the numbers involved.
// The fact that the number of steps required by Euclid's Algorithm has logarithmic growth bears an interesting relation to the Fibonacci numbers:

function euclidsAlgorithm(a, b) {
  //gcd(3, 6) === 3
  return b === 0 ? a : euclidsAlgorithm(b, a % b);
}

/*
Searching for divisors

One way to test if a number is prime is to find the number's divisors. 
Find the smallest integral divisor (greater than 1) of a given number 𝑛. 
It does this in a straightforward way, by testing 𝑛 for divisibility by successive integers starting with 2.

*/
function square(x) {
  return x * x;
}

function divides(a, b) {
  return b % a === 0;
}
function isPrime(n) {
  //Prime numbers are positive, non-zero numbers that have exactly two factors -- no more, no less.
  //A prime number is a whole number greater than 1 whose only factors are 1 and itself.
  return n === smallestDivisor(n) ? "true" : "false";
}

function smallestDivisor(n) {
  return findDivsor(n, 2);
}

function next(n) {
  return n === 2 ? 3 : n + 2;
}
function findDivsor(n, testDivisor) {
  return square(testDivisor) > n
    ? n
    : divides(testDivisor, n)
    ? testDivisor
    : findDivsor(n, next(testDivisor));
  // based on the fact that if 𝑛 is not prime it must have a divisor less than or equal to 𝑛√.
  //This means that the algorithm need only test divisors between 1 and 𝑛√.
  //Consequently, the number of steps required to identify 𝑛 as prime will have order of growth Θ(𝑛√).
}
/*
The Fermat test
The Θ(log𝑛) primality test is based on a result from number theory known as Fermat's Little Theorem.[2]

Fermat's Little Theorem: If 𝑛 is a prime number and 𝑎 is any positive integer less than 𝑛, 
then 𝑎 raised to the 𝑛th power is congruent to 𝑎 modulo 𝑛.

Two numbers are said to be congruent modulo 𝑛 if they both have the same remainder when divided by 𝑛. 
The remainder of a number 𝑎 when divided by 𝑛 is also referred to as the remainder of 𝑎 modulo 𝑛, or simply as 𝑎 modulo 𝑛.)
If 𝑛 is not prime, then, in general, most of the numbers 𝑎<𝑛 will not satisfy the above relation. 
This leads to the following algorithm for testing primality: Given a number 𝑛, pick a random number 𝑎<𝑛 
and compute the remainder of 𝑎𝑛 modulo 𝑛. If the result is not equal to 𝑎, then 𝑛 is certainly not prime. 
If it is 𝑎, then chances are good that 𝑛 is prime. Now pick another random number 𝑎 and test it with the same method. 
If it also satisfies the equation, then we can be even more confident that 𝑛 is prime. 
By trying more and more values of 𝑎, we can increase our confidence in the result. 
This algorithm is known as the Fermat test.

*/
function isEven(x) {
  return x % 2 === 0;
}
let randomnum = n => Math.floor(Math.random() * 15000);
function random(n) {
  return randomnum(n);
}
function expmod(base, exp, m) {
  // To implement the Fermat test, we need a function that computes the exponential of a number modulo another number:
  return exp === 0
    ? 1
    : isEven(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
  //uses successive squaring, so that the number of steps grows logarithmically with the exponent.
}
function fermatTest(n) {
  function tryIt(a) {
    return expmod(a, n, n) === a;
  }
  return tryIt(1 + random(n - 1));
}

function fastIsPrime(n, times) {
  return times === 0 ? true : fermatTest(n) ? fastIsPrime(n, times - 1) : false;
}
function ex121() {
  function smallestDivisor(n) {
    return findDivisor(n, 2);
  }

  function findDivisor(n, testDivisor) {
    return square(testDivisor) > n
      ? n
      : divides(testDivisor, n)
      ? testDivisor
      : findDivisor(n, testDivisor + 1);
  }
  function divides(x, y) {
    return y % x === 0 ? 1 : 0;
  }
  return smallestDivisor;
}
function ex128() {
  function random(n) {
    return Math.floor(Math.random() * n);
  }
  function millerRabinTest(n) {
    function expmod(base, exp, m) {
      return exp === 0
        ? 1
        : isEven(exp)
        ? square(trivialTest(expmod(base, exp / 2, m), m)) % m
        : (base * expmod(base, exp - 1, m)) % 2;
    }

    function trivialTest(r, m) {
      return r === 1 || r === m ? r : square(r % m === 1 ? 0 : r);
    }
    function tryIt(a) {
      return expmod(a, n - 1, n) === 1;
    }
    return tryIt(1 + random(n - 1));
  }
  function doMillerRabinTest(n, times) {
    return times === 0
      ? true
      : millerRabinTest(n)
      ? doMillerRabinTest(n, times - 1)
      : false;
  }
  return doMillerRabinTest;
}
export function GreatestCommonDivisors() {
  return (
    <div>
      <div>-----------------</div>
      <div>GreatestCommonDivisors</div>
      <br />
      <div>{euclidsAlgorithm(3, 6)}</div>
      <div>{smallestDivisor(2643272)}</div>
      <div>{smallestDivisor(2516126)}</div>
      <div>{smallestDivisor(119)}</div>
      <div>{smallestDivisor(1999)}</div>
      <div>{smallestDivisor(65)}</div>
      <div>{isPrime(151)}</div>

      <div>{fermatTest(1).toString()}</div>
      <div>{fastIsPrime(1, 1)}</div>
      <div>{fastIsPrime(1, 1)}</div>
      <div>{ex121()(150)}</div>
      <div>{ex128()(123, 115)}</div>
      <div>-----------------</div>
    </div>
  );
}
