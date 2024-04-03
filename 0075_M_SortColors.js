// 2024/04/03 - with Count Sort
// O(n + k) time complexity
// O(k) space complexity
// where n = # elements, k = max value
// Time to complete: 4:16 min
// Patterns: Count Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const counts = new Array(4).fill(0);

  nums.forEach((num) => counts[num]++);

  let pos = 0;
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];

    while (count) {
      nums[pos] = i;
      pos++;
      count--;
    }
  }
};

// 2024/04/02 - Optimized
// O(n) time complexity
// O(1) space complexity
// Time to complete: 19 min
// Patterns: 3 Pointers
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  const swap = (a, b) => {
    const temp = nums[b];
    nums[b] = nums[a];
    nums[a] = temp;
  }

  let ptr0 = 0;
  let curr = 0;
  let ptr2 = nums.length - 1;

  while (curr < nums.length && curr <= ptr2) {
    if (nums[curr] === 0) {
      swap(curr, ptr0);
      ptr0++;
      curr++;
    } else if (nums[curr] === 2) {
      swap(curr, ptr2);
      ptr2--;
    } else {
      curr++;
    }
  }
};

// 2024/04/02
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 3:40 min
// Patterns: Selection Sort
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    let minVal = Infinity;
    let minIndex = -1;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < minVal) {
        minVal = nums[j];
        minIndex = j;
      }
    }

    const temp = nums[i];
    nums[i] = nums[minIndex];
    nums[minIndex] = temp;
  }
};



const testCases = [
  {
    input: '',
    expected: ''
  },
];

testCases.forEach((testCase) => {
  // let result = FUT(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);