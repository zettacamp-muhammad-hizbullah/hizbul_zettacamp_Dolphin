/**
 *
 * Write a Node.js function isPrime(n) that takes an integer n as an argument and returns true if n is a prime number and false otherwise.
 *
 */
// function isPrime(n) {
//   // Your logic here
//   if (n < 2) return false;

//   for (let i = 2; i <= Math.floor(n / 2); i++) {
//     // console.log(i);
//     if (n % i === 0) return false;
//   }
//   return true;
// }

// console.log(isPrime(10));
// console.log(isPrime(43));

function isInt(n) {
  return n % 1 === 0;
}

const isPrime = function (n) {
  // Your logic here
  if (!isInt(n)) {
    return false;
  }

  console.log(`check => ${n}`);
  if (n < 2) return false;

  for (let i = 2; i <= n; i++) {
    // console.log(i);
    // return;
    if (n % i === 0) return false;
  }
  return true;
};

// falsy values
// 0
// null
// undefined
// ''
// ""

// log = false;
// console.log('console' + log);
// console.log(typeof ('console' + log));
// console.log('console' + log ? true : false);

// console.log(isPrime(7.5));
// console.log(isPrime(-1));
console.log(isPrime(55));
// console.log(isPrime(10));
// console.log(isPrime(43));

// const isPrime = (n) => {
//   // Your logic here
//   if (n < 2) return false;

//   for (let i = n - 1; i > 1; i--) {
//     console.log(i);
//     if (n % i === 0) return false;
//   }
//   return true;
// };

// console.log(isPrime(9));
// console.log(isPrime(1));
// console.log(isPrime(4));
// console.log(isPrime(6));
// console.log(isPrime(55));
// console.log(91%2);
// console.log('==========');

// console.log(isPrime(2));
// console.log(isPrime(3));
// console.log(isPrime(5));
// console.log(isPrime(7));
// console.log(isPrime(11));

// console.log('==========');

// console.log(isPrime(10));
// console.log(isPrime(43));
