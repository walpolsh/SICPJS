import React from "react";
const R = require("ramda");
const log = x => console.log(x);

function pair(x, y) {
  return [x, y];
}
let pairs = pair(11, pair(21, pair(3, pair(4, []))));
let pairs2 = pair(1, pair(2, pair(3, pair(4, []))));
let list = fn => fn;
let pairsList = list([1, 2, 3, 4]);
const [head, tail] = [R.head, R.tail];
log(pairs2);
// The above sequence could be produced by list(1, 2, 3, 4).In general,
//   list(a1, a2, …, a𝑛)
// is equivalent to
// pair(a1, pair(a2, pair(…, pair(a𝑛, []) …)))

// function listRef(items, n) {
//   return n === 0 ? head(items) : listRef(tail(items), n - 1);
// }
const odds = list(1, 3, 5, 7);

function length(items) {
  return R.empty(items) ? 0 : 1 + length(tail(items));
}
const evens = list(1, 2, 4, 5, 5, 6, 5);
// const res = listRef(evens, 4);
const lengthEven = length(evens);
function list_ref_(items, n) {
  return n === 0 ? head(items) : list_ref_(tail(items), n - 1);
}
function reverse(items) {
  function reverseIter(items, result) {
    return R.empty(items)
      ? result
      : reverseIter(R.tail(items), pair(R.head(items), result));
  }
  return reverseIter(items, []);
}
const ukcoins = list(1, 4, 9, 16, 25);
const uscoins = list(50, 105, 5, 5);

function cc(amount, coinVal) {
  return amount === 0
    ? 1
    : amount < 0 || no_more(coinVal)
    ? 0
    : cc(amount, except_first_denomination(coinVal)) +
      cc(amount - first_denomination(coinVal), coinVal);
}
function first_denomination(coin_values) {
  return R.head(coin_values);
}
function except_first_denomination(coin_values) {
  return R.tail(coin_values);
}
function no_more(coin_values) {
  return R.empty(coin_values) ? 1 : 0;
}
log(lengthEven);
//mapping over lists
//One extremely useful operation is to apply some transformation to each element in a list and generate the list of results.
//For instance, the following function scales each number in a list by a given factor:

function scaleList(items, factor) {
  return items.length === 0
    ? []
    : pair(R.head(items) * factor, scaleList(R.tail(items), factor));
}

function map(fn, items) {
  return R.empty(items) ? [] : pair(fn(R.head(items)), map(fn, R.tail(items)));
}

function forEach(proc, items) {
  if (R.empty(items)) {
    return [];
  } else {
    proc(R.head(items));
    forEach(proc, tail(items));
  }
}
export const RepresentingSequences = (
  <div>
    <div>--------------------------</div>
    <div>RepresentingSequences</div>
    <div>{pairs}</div>
    {/* <div>{head(pairsList)}</div>
    <div>{tail(pairsList)}</div> */}
    <div>{pairsList}</div>
    <div />
    <div>{pair(10, pairs2)}</div>
    <div>{pair("nice ", pairs2)}</div>
    <div>asdgas {length(odds)}</div>
    <div>{lengthEven}</div>
    <div>{R.tail("abc")}</div>
    <div>{reverse(list(1, 2, 3)).toString()}</div>
    <div>{scaleList([2, 4, 3], 2)}</div>
    <div>{map(Math.abs, list(1, 24))}</div>
    <div>{forEach(x => x + 1, [1, 2, 3])}</div>
    <div>--------------------------</div>
  </div>
);
