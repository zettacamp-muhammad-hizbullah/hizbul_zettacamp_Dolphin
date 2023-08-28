/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

// function hasUniqueCharacters(str) {
//   // Your logic here
//   const duplicateChars = [];
//   str = str.toLowerCase();

//   if (!/^[a-z]+$/.test(str)) {
//     return 'must alphabet contains';
//   }

//   loop1: for (let i = 0; i < str.length; i++) {
//     const currentChar = str[i];
//     for (let j = i + 1; j < str.length; j++) {
//       console.log('i => ', currentChar, '| j => ', str[j]);
//       if (currentChar === str[j]) {
//         console.error('duplicate char', currentChar);
//         duplicateChars.push(currentChar);
//         break loop1;
//       }
//     }
//   }

//   return duplicateChars.length > 0 ? false : true;
// }

function hasUniqueCharacters(str) {
  // Your logic here
  str = str.toLowerCase();

  if (!/^[a-zA-Z]+$/.test(str)) {
    return 'must alphabet contains';
  }

  let charArray = str.split('');
  let isExistDuplicateChar = charArray.some((char, index, arr) => {
    // console.log('index saat ini => ', index);
    // console.log('char saat ini => ', char);
    // console.log('index terakhir dari char saat ini => ', arr.lastIndexOf(char));
    // let indexOfChar = arr.lastIndexOf(char)
    // console.log('char dari index terakhir => ', arr[indexOfChar]);
    // console.log('cek index terakhir dari char saat ini dengan index saat ini => ', arr.lastIndexOf(char) !== index);
    // kalo kedua index sama, artinya tidak ada duplikat char, kalo berbeda artinya ada lebih dari 1 char yang sama
    return arr.lastIndexOf(char) !== index;
  });
  console.log('is exist duplicate char => ', isExistDuplicateChar);
  // jika string "aku"
  // a cari index, index of a = 0, apakah 0 tidak sama index saat ini yaitu = 0, ternyata sama, maka
  // console.log(isExistDuplicateChar);

  return !isExistDuplicateChar;
}

// console.log(hasUniqueCharacters('akks')); // Output: false
// console.log(hasUniqueCharacters('abcdefg')); // Output: true
console.log(hasUniqueCharacters('hello')); // Output: false
// console.log(hasUniqueCharacters('HellO')); // Output: false
// console.log(hasUniqueCharacters('ssss')); // Output: false
// console.log(hasUniqueCharacters('HellO123')); // Output: void error
