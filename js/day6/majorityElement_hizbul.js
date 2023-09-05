/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */
function majorityElement(nums) {
  // let aku = 'yes'
  // console.log(aku);
  // Your logic here
  let elementMajority = nums[0];
  console.log(elementMajority);
  let tempTimes = 1;
  console.log(tempTimes);
  let times = 0;
  console.log(times);

  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = 0; j < nums.length; j++) {
  //     if (nums[i] === nums[j]) {
  //       times++;
  //       console.log(times);
  //     }
  //     if (tempTimes < times) {
  //       tempTimes = times;
  //       console.log(tempTimes);
  //       elementMajority = nums[i];
  //       console.log(elementMajority);
  //     }
  //   }
  //   times = 0;
  //   console.log(times);
  // }

  nums.map((num) => {
    nums.map((num2) => {
      if (num === num2) {
        times++;
        console.log(times);
      }
      if (tempTimes < times) {
        tempTimes = times;
        console.log(tempTimes);
        elementMajority = num;
        console.log(elementMajority);
      }
    });
    times = 0;
    console.log(times);
  });

  return elementMajority;
}

// majorityElement(2)

// console.log(majorityElement([1, 2, 1]), majorityElement([3, 2, 3])); // Output: 1 & 3

console.log(() => {
  let tes = '';
  tes = 'jajan';
  console.log(tes);
  return console.log('selamat');
}, majorityElement([3, 2, 3]));
// console.log(majorityElement([3, 2, 3])); // Output: 3
// console.log('run this code', majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
