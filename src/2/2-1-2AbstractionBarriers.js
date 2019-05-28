import React from "react";
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
export const AbstractionBarriers = (
  <div>
    <div>--------------------------</div>
    <div>AbstractionBarriers</div>
    <div>{printRat(oneHalf)}</div>
    <div>{printRat(twoFifths)}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>{}</div>
    <div>--------------------------</div>
  </div>
);
