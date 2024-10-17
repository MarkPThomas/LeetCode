// 2024/10/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: 31:58 min
// Notes w.r.t. solution: 1 Hashmap - refactored from below. Same time included.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  const counts = {};
  for (const num of nums) {
    if (k <= num) {
      continue;
    } else if (!counts[num]) {
      counts[num] = 0;
    }
    counts[num]++;
  }

  let numOps = 0;
  for (const num of Object.keys(counts)) {
    const val1 = parseInt(num);
    const val2 = k - num;
    if (counts[val2] > 0 && (val1 !== val2 || counts[val2] > 1)) {
      const count = val1 !== val2
        ? Math.min(counts[val1], counts[val2])
        : Math.floor(counts[val1] / 2);

      numOps += count;

      counts[val1] -= count;
      counts[val2] -= count;
    }
  }

  return numOps;
};

// 2024/10/17
// O(n) time complexity
// O(n) space complexity
// Time to complete: 31:58 min
// Notes w.r.t. solution: 2 Hashmaps
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  const counts = {};
  for (const num of nums) {
    if (k <= num) {
      continue;
    } else if (!counts[num]) {
      counts[num] = 0;
    }
    counts[num]++;
  }

  const pairs = {};
  for (const num of Object.keys(counts)) {
    pairs[num] = k - num;
  }

  let numOps = 0;
  for (const num of Object.keys(counts)) {
    const val1 = parseInt(num);
    const val2 = pairs[val1];
    if (val2 && pairs[val2] && (val1 !== val2 || counts[val2] > 1)) {
      const count = val1 !== val2
        ? Math.min(counts[val1], counts[val2])
        : Math.floor(counts[val1] / 2);

      numOps += count;

      counts[val1] -= count;
      if (!counts[val1]) {
        delete pairs[val1];
      }

      if (counts[val2] >= count) {
        counts[val2] -= count;
        if (!counts[val2]) {
          delete pairs[val2];
        }
      }
    }
  }

  return numOps;
};


// 2023/06
// O(n * log (n)) time complexity
// O(1) space complexity
// Time to complete: 23 min brute force, 10 min 2 pointer// Patterns: 2 Pointer
// Notes w.r.t. solution: Can do O(n) time & space complexities with 1- or 2-passes with hashmap.
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function (nums, k) {
  nums.sort((a, b) => a - b);
  let rightPtr = nums.length - 1;
  while (0 < rightPtr && k <= nums[rightPtr]) {
    rightPtr--;
  }
  if (rightPtr === 0) {
    return 0;
  }

  let numOperations = 0;
  let leftPtr = 0;
  while (leftPtr < rightPtr) {
    const numSmall = nums[leftPtr];
    const numLarge = nums[rightPtr];
    if (numSmall + numLarge === k) {
      numOperations++;
      leftPtr++;
      rightPtr--;
    } else if (numSmall + numLarge > k) {
      rightPtr--;
    } else {
      leftPtr++;
    }
  }
  return numOperations;
};



// // Brute force
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var maxOperations = function (nums, k) {
//   const visitedNums = {};
//   let numOperations = 0;
//   let basePtr = 0;
//   while (basePtr < nums.length - 1) {
//     const num1 = nums[basePtr];
//     let nextPtr = basePtr + 1;
//     if (num1 < k && !visitedNums[basePtr]) {
//       while (nextPtr < nums.length) {
//         if (!visitedNums[nextPtr]) {
//           const num2 = nums[nextPtr];
//           if (!visitedNums[nextPtr] && num1 + num2 === k) {
//             numOperations++;
//             visitedNums[nextPtr] = true;
//             break;
//           }
//         }
//         nextPtr++;
//       }
//     }
//     visitedNums[basePtr] = true;
//     basePtr++;
//   }
//   return numOperations;
// };