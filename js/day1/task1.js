const { constFavouriteBook, favouriteBook, favouriteBooksArray, constFavouriteBooksArray, age, isIndonesian, hobby } = require("./task1-variable")
// TASK 1
console.log('\n\nSTRING ============ PRIMITIVE\n\n');
console.log(favouriteBook);
favouriteBook = 'Laskar Pelangi';
console.log(favouriteBook);
console.log(typeof favouriteBook);

console.log('\n\nARRAY ============ DYNAMIC\n\n');
console.log(favouriteBooksArray);
favouriteBooksArray[0] = 'Laskar Pelangi';
console.log(favouriteBooksArray);
console.log(typeof favouriteBooksArray);

console.log('\n\nARRAY ============ DYNAMIC\n\n');
console.log(constFavouriteBooksArray);
constFavouriteBooksArray[0] = 'Laskar Pelangi';
console.log(constFavouriteBooksArray);
console.log(typeof constFavouriteBooksArray);

console.log('\n\nSTRING ============ PRIMITIVE\n\n');
console.log(constFavouriteBook);
console.log(typeof constFavouriteBook);
// constFavouriteBook = 'Mars';
// console.log(constFavouriteBook);

console.log('\n\nNUMBER ============ PRIMITIVE\n\n');
console.log(age);
console.log(typeof age);

console.log('\n\nBOOLEAN ============ PRIMITIVE\n\n');
console.log(isIndonesian);
console.log(typeof isIndonesian);

console.log('\n\nNULL ============ PRIMITIVE\n\n');
console.log(hobby);
console.log(typeof hobby);

console.log('\n\nUNDEFINED ============ PRIMITIVE\n\n');
console.log(future);
console.log(typeof future);

console.log('\n\nUNDEFINED ============ PRIMITIVE\n\n');
let future2;
console.log(future2);
console.log(typeof future2);

console.log('\n\nSYMMBOL ============ PRIMITIVE\n\n');
console.log(symbol);
console.log(typeof symbol);

console.log('\n\nOBJECT ============ DYNAMIC\n\n');
console.log(object);
object.hello = 'dunia';
console.log(object);
console.log(typeof object);

console.log('\n\nDATE ============ DYNAMIC\n\n');
console.log(currentDate);
console.log(typeof currentDate);


const currentFunc = function testFunction() {
  console.log('this function');
};
// console.log(currentFunc);
// currentFunc = function replaceFunction() {
//   console.log('replaced function');
// };
// console.log(currentFunc);
console.log(typeof currentFunc);
