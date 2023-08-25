const constFavouriteBookPrice = 6e5;
let letFavouriteBookPrice = 8e5;
// console.log(8e-1);
// A
function theHighestPrice(priceOne, priceTwo) {
  if (priceOne === priceTwo) {
    console.log('equal');
  }
  return priceOne > priceTwo ? console.log(priceOne) : console.log(priceTwo);
}
console.log('==== A ====');
theHighestPrice(constFavouriteBookPrice, letFavouriteBookPrice);

// B
function averagePrice() {
  const result = (constFavouriteBookPrice + letFavouriteBookPrice) / 2;
  return result;
}
console.log('\n\n==== B ====');
const resultAveragePrice = averagePrice();
console.log(resultAveragePrice);

// C
function expensiveOrCheap() {
  const value = averagePrice();
  return value > 5e5 ? 'Expensive' : 'Cheap';
}
console.log('\n\n==== C ====');
const isExpensiveOrCheap = expensiveOrCheap();
console.log(isExpensiveOrCheap);

console.log('\n\n==== Explore ====');

const objectOne = {
  keyOne: 'string',
};
objectOne.keyTwo = true;
// objectOne.keyTwo2 = undefined;

Object.assign(objectOne, { keyThree: 123 });
console.log(objectOne);
// objectOne = {
//     ...objectOne,
//     keyFour: null
// }
// console.log(objectOne);

const arrayOne = [];
console.log(arrayOne);
arrayOne.push(objectOne);
console.log(arrayOne);

// let i = 2;
// console.log(++i);
// console.log((i = +1));
// // i =+ 1
// // i = 1 + i

// let j = 2;
// console.log(j++);
// // j += 1
// // j = j + 1

const test1 = 'asfdsa';
const test2 = 123123;

console.log(Object.assign({ asd: test1, test2: test2 }));
