import React from "react";
function abs(x) {
  return x >= 0 ? x : -x;
}
function square(x) {
  return x * x;
}
function ex115() {
  // The sine of an angle(specified in radians) can be computed by making use of the approximation sin𝑥≈𝑥 if 𝑥 is sufficiently small,
  //and the trigonometric identity sin 𝑥 = 3 sin (𝑥/3) − 4 sin^3 (𝑥/3) to reduce the size of the argument of sin.
  // (For purposes of this exercise an angle is considered sufficiently small if its magnitude is not greater than 0.1 radians.)
  function cube(x) {
    return Math.pow(x, 3);
  }
  function p(x) {
    return 3 * x - 4 * cube(x);
  }

  function sine(angle) {
    //the function P will be called as long as the angle value is greater than 0.1.
    return !(abs(angle) > 0.1) ? angle : p(sine(angle / 3.0));
  }
  //The order of growth in space and number of steps used by the process are both logarithmic in nature.
  // The growth will be of the order of 𝑂(𝑙𝑜𝑔3(𝑛)) and as can be seen it is a linear recursive process, the number of steps grows proportionally.
  return sine(12.15);
  // Since, the angle provided is 12.15, the function P will be called 5 times.
  // after first function P call, angle value is 4.05
  // after second function P call, angle value is 1.35
  // after third function P call, angle value is 0.45
  // after fourth function P call, angle value is 0.15
  // after fifth function P call, angle value is 0.05 which is lesser than 0.1
}

function expt(b, n) {
  //b^n = b * b^n-1
  // b^0 = 1
  //This is a linear recursive process, which requires Θ(𝑛) steps and Θ(𝑛) space.
  return n === 0 ? 1 : b * expt(b, n - 1);
}
// Just as with factorial, we can readily formulate an equivalent linear iteration:
// This version requires Θ(𝑛) steps and Θ(1) space.
function expt2(b, n) {
  return exptIter(b, n, 1);
}
function exptIter(base, counter, product) {
  return counter === 0 ? product : exptIter(base, counter - 1, base * product);
}
// We can compute exponentials in fewer steps by using successive squaring.
// For instance, rather than computing 𝑏^8 as 𝑏⋅(𝑏⋅(𝑏⋅(𝑏⋅(𝑏⋅(𝑏⋅(𝑏⋅𝑏))))))
// We can compute it using three multiplications
//b^2 = b * b
//b^4 = b^2 * b^2
//b^8 = b^4 * b^4

// This method works fine for exponents that are powers of 2.
// We can also take advantage of successive squaring in computing exponentials in general if we use the rule
// 𝑏𝑛=(𝑏^𝑛/2)^2 if 𝑛 is even
// 𝑏𝑛=𝑏⋅𝑏^𝑛−1 if 𝑛 is odd

function fastExpt(b, n) {
  //fastExpt grows logarithmically with 𝑛 in both space and number of steps.

  return n === 0
    ? 1
    : isEven(n)
    ? //Computing 𝑏^2𝑛 requires only one more multiplication than computing 𝑏^𝑛.
      square(fastExpt(b, n / 2)) //𝑏𝑛=(𝑏^𝑛/2)^2
    : b * fastExpt(b, n - 1); // 𝑏𝑛=𝑏⋅𝑏^𝑛−1
  //𝑛=1000 requires only 14 multiplications
}
function ex116() {
  function fastExpt2(b, n) {
    // a function that evolves an iterative exponentiation process that uses successive squaring and uses a logarithmic number of steps
    return fastExptIter(1, b, n);
  }

  function fastExptIter(state, base, exp) {
    //the product state*base^exp is unchanged from state to state.
    if (exp === 0) {
      //At the beginning the state is taken to be 1, and the asnwer is given by the value of state at the end.
      return state;
    } else if (isEven(exp)) {
      return fastExptIter(state, square(base), exp / 2);
    } else {
      return fastExptIter(state * base, base, exp - 1);
    }
  }
  return fastExpt2(32, 50);
}

function isEven(n) {
  return n % 2 === 0;
}

function ex117() {
  function times(a, b) {
    //This algorithm takes a number of steps that is linear in b.
    return b === 0 ? 0 : a + a * (b - 1);
  }

  function halve(x) {
    return x / 2;
  }

  function double(x) {
    return x * 2;
  }

  function multiplication(a, b) {
    //Here have a multiplication function analogous to fast_expt that uses a logarithmic number of steps.
    //We include addition, double: which doubles an integer, and halve: which divides an (even) integer by 2.
    if (b === 1) {
      return a;
    } else if (a === 0 || b === 0) {
      return 0;
    } else if (isEven(b)) {
      return double(multiplication(a, halve(b)));
    } else {
      return a + multiplication(a, b - 1);
    }
  }
  return [times(3, 5), multiplication(3, 5)];
}

function ex118() {
  // a multiplication function analogous to fast_expt that uses a logarithmic number of steps.
  function halve(x) {
    return x / 2;
  }

  function double(x) {
    return x * 2;
  }

  function iteration(total, a, b) {
    if (b === 1) {
      return total + a;
    } else if (a === 0 || b === 0) {
      return 0;
    } else if (isEven(b)) {
      return iteration(total, double(a), halve(b));
    } else {
      return iteration(total + a, a, b - 1);
    }
  }
  function multiply(a, b) {
    return iteration(0, a, b);
  }

  return multiply(2, 2);
}

function ex119() {
  /*
  There is a clever algorithm for computing the Fibonacci numbers in a logarithmic number of steps.
  Recall the transformation of the state names 𝑎 and 𝑏 in the fib_iter process of Section 1.2.2: 𝑎←𝑎+𝑏 and 𝑏←𝑎.
  Call this transformation 𝑇, and observe that applying 𝑇 over and over again 𝑛 times, starting with 1 and 0, produces the pair: 
  Fib(𝑛+1) and Fib(𝑛).
  In other words, the Fibonacci numbers are produced by applying 𝑇𝑛, the 𝑛th power of the transformation 𝑇, starting with the pair(1, 0).
  Now consider 𝑇 to be the special case of 𝑝=0 and 𝑞=1 in a family of transformations 𝑇𝑝𝑞
  Where 𝑇𝑝𝑞 transforms the pair (𝑎,𝑏) according to 𝑎←𝑏𝑞+𝑎𝑞+𝑎𝑝 and 𝑏←𝑏𝑝+𝑎𝑞. 
  Show that if we apply such a transformation 𝑇𝑝𝑞 twice, the effect is the same as using a single transformation 𝑇𝑝′𝑞′ of the same form,
  and compute 𝑝′ and 𝑞′ in terms of 𝑝 and 𝑞. This gives us an explicit way to square these transformations,
  and thus we can compute 𝑇𝑛 using successive squaring, as in the fast_expt function. 
  Put this all together to complete the following function, which runs in a logarithmic number of steps:
  Another pure mathematical task.

  We have some initial a, b and p, q and two transformations for calculating next a and b:
  a1 <- bq + aq + ap
  b1 <- bp + aq

  When we apply same transformation (with the same p and q) to the new arguments we get:
  b2 <- b1*p + a1*q
  b2 <- (bp+aq)p + (bq+aq+ap)q
  b2 <- bp^2 + apq + bq^2 + aq^2 + apq
  b2 <- b(p^2 + q^2) + a(q^2 + 2pq),
  which means that applying transformation twice with initial p and q are the same
  as applying (p^2 + q^2) as p and (q^2 + 2pq) as q once. Eventually we can compute new
  arguments for applying (p^2 + q^2) and (q^2 + 2pq) twice and so on.

  In terms of Scheme new p and q are calculated like
  (+ (square p) (square q))
  (+ (square q) (* 2 p q))
  respectively
  */
  function isEven(n) {
    return n % 2 === 0;
  }
  function fib(n) {
    return fibIter(1, 0, 0, 1, n); // starting with 1 and 0 apply Fib(n+1) and Fib(n) over and over n times.
  }
  function fibIter(a, b, p, q, count) {
    return count === 0 // if count is 0
      ? b //return
      : isEven(count)
      ? fibIter(
          a, // 1
          b, // 0
          p * p + q * q, // 0 * 0 * + 1 * 1
          2 * p * q + q * q, //2 * 0 * 1 + 1 * 1
          count / 2 //split count in half
        )
      : fibIter(b * q + a * q + a * p, b * p + a * q, p, q, count - 1);
  }

  return fib;
}

export function OrdersOfGrowth() {
  return (
    <div>
      OrdersOfGrowth
      <div>------------------</div>
      <div>{ex115()}</div>
      <div>{expt(32, 6)}</div>
      <div>{expt2(32, 6)}</div>
      <div>{fastExpt(32, 6)}</div>
      <div>{ex116()}</div>
      <div>
        {ex117()[0]} {ex117()[1]}
      </div>
      <div>{ex118()}</div>
      <div>fib {ex119()(14)}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>------------------</div>
    </div>
  );
}
