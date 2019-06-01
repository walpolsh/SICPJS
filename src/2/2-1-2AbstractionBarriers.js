import React from "react";

/* 
We can envision the structure of the rational-number system as shown:

- Programs that use rational numbers -
Rational Numbers in the problem domain
- addRat subCat .... - 
Rational numbers as numerators and denominators

- makeRat numer denom -
Rational numbers as pairs
- cons car cdr -
However pairs are implemented

The horizontal lines represent abstraction barriers that isolate different levels of the system. 
At each level, the barrier separates the programs (above) that use the data abstraction from the programs (below) that implement the data abstraction. 
Programs that use rational numbers manipulate them solely in terms of the functions supplied for public use by the rational-number package: add_rat, sub_rat, mul_rat, div_rat, and equal_rat. 
These, in turn, are implemented solely in terms of the constructor and selectors make_rat, numer, and denom, which themselves are implemented in terms of pairs. 
The details of how pairs are implemented are irrelevant to the rest of the rational-number package so long as pairs can be manipulated by the use of pair, head, and tail. 
In effect, functions at each level are the interfaces that define the abstraction barriers and connect the different levels.

This simple idea has many advantages. One advantage is that it makes programs much easier to maintain and to modify. 
Any complex data structure can be represented in a variety of ways with the primitive data structures provided by a programming language. 
Of course, the choice of representation influences the programs that operate on it; 
thus, if the representation were to be changed at some later time, all such programs might have to be modified accordingly. 
This task could be time-consuming and expensive in the case of large programs unless the dependence on the 
representation were to be confined by design to a very few program modules.

For example, an alternate way to address the problem of reducing rational numbers to lowest terms is to 
perform the reduction whenever we access the parts of a rational number, rather than when we construct it. 
This leads to different constructor and selector functions:

*/

function pair(x, y) {
  return { x, y };
}

function head(x) {
  return x.x;
}

function tail(x) {
  return x.y;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function makeRat(n, d) {
  return pair(n, d);
}

function numer(x) {
  const g = gcd(head(x), tail(x));
  return head(x) / g;
}

function denom(x) {
  const g = gcd(head(x), tail(x));
  return tail(x) / g;
}

const oneHalf = makeRat(1, 2);
const twoFifths = makeRat(2, 5);

function printRat(x) {
  return numer(x) + "/" + denom(x);
}

/*
The difference between this implementation and the previous one lies in when we compute the gcd. 
If in our typical use of rational numbers we access the numerators and denominators of the same rational numbers many times, 
it would be preferable to compute the gcd when the rational numbers are constructed. 
If not, we may be better off waiting until access time to compute the gcd. 
In any case, when we change from one representation to the other, the functions add_rat, sub_rat, and so on do not have to be modified at all.

Constraining the dependence on the representation to a few interface functions helps us design programs as well as modify them, 
because it allows us to maintain the flexibility to consider alternate implementations. 
To continue with our simple example, suppose we are designing a rational-number package and we can't decide 
initially whether to perform the gcd at construction time or at selection time. 
The data-abstraction methodology gives us a way to defer that decision without losing the ability to make progress on the rest of the system.
*/

function ex220() {
  /* 
  Consider the problem of representing line segments in a plane. Each segment is represented as a pair of points: a starting point and an ending point. 
  Define a constructor make_segment and selectors start_segment and end_segment that define the representation of segments in terms of points. 
  Furthermore, a point can be represented as a pair of numbers: the 𝑥 coordinate and the 𝑦 coordinate. 
  Accordingly, specify a constructor make_point and selectors x_point and y_point that define this representation. 
  Finally, using your selectors and constructors, define a function midpoint_segment that takes a line segment as argument and returns its midpoint 
  (the point whose coordinates are the average of the coordinates of the endpoints). 
  */

  function xpoint(x) {
    //starting point
    return head(x);
  }

  function ypoint(x) {
    //ending point
    return tail(x);
  }

  function makePoint(x, y) {
    //a point can be represented as a pair of numbers: the 𝑥 coordinate and the 𝑦 coordinate
    return pair(x, y);
  }

  function endPoint(x, y) {
    return pair(x, y);
  }

  function makeSegment(start, end) {
    //constructor define the 𝑥 coordinate and the 𝑦 coordinate
    return pair(start, end);
  }

  function startSegment(x) {
    //selector
    return head(x);
  }

  function endSegment(x) {
    //selector
    return tail(x);
  }

  function average(a, b) {
    return (a + b) / 2;
  }

  function midPointSegment(x) {
    //takes a line segment as argument and returns its midpoint
    const a = startSegment(x);
    const b = endSegment(x);
    //(the point whose coordinates are the average of the coordinates of the endpoints)
    return makePoint(
      average(xpoint(a), xpoint(b)),
      average(ypoint(a), ypoint(b))
    );
  }

  function printPoint(p) {
    //print points
    return `(${xpoint(p)}, ${ypoint(p)})`;
  }
  const oneHalf = makeSegment(makePoint(0, 0), endPoint(2, 2));
  return printPoint(midPointSegment(oneHalf));
}
function ex230() {
  /*
  Implement a representation for rectangles in a plane. (Hint: You may want to make use of Exercise 2.2.) 
  In terms of your constructors and selectors, create functions that compute the perimeter and the area of a given rectangle. 
  Now implement a different representation for rectangles. 
  Can you design your system with suitable abstraction barriers, so that the same perimeter and area functions will work using either representation?
  */

  function makePoint(x, y) {
    return pair(x, y);
  }

  function makeRect(bottomLeft, width, height) {
    return pair(makePoint(0, 0), pair(width, height));
  }

  function widthRect(rect) {
    return tail(tail(rect));
  }
  function heightRect(rect) {
    return head(tail(rect));
  }
  function areaRect(rect) {
    //computes the area of a given rectangle
    return widthRect(rect) * heightRect(rect);
  }
  function perimeterRect(rect) {
    //computers the perimeter
    return 2 * (widthRect(rect) + heightRect(rect));
  }
  const v = makeRect(makePoint(-1, 0), 3, 4);
  return [areaRect(v), perimeterRect(v)];
}
export const AbstractionBarriers = (
  <div>
    <div>--------------------------</div>
    <div>AbstractionBarriers</div>
    printRat(oneHalf)
    <div>{printRat(oneHalf)}</div>
    printRat(twoFifths)
    <div>{printRat(twoFifths)}</div>
    ex220()
    <div>{ex220()}</div>
    ex230()[0]
    <div>{ex230()[0]}</div>
    ex230()[1]
    <div>{ex230()[1]}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>--------------------------</div>
  </div>
);
