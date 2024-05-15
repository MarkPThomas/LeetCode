// 2024/05/15
// O(n) time complexity
// O(1) space complexity
// Time to complete: 22:18 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: Solved both naiive & then optimized solutions.
//    Lost a lot of time with minor up-front optimizations. Do these later instead!
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  if (numbers[0] <= 0 || numbers[0] < target) {

    let maxPtr = numbers.length - 1;
    if (0 < numbers[0]) {
      while (numbers[maxPtr] && target <= numbers[maxPtr]) {
        maxPtr--;
      }
    }

    let minPtr = 0;
    while (minPtr < maxPtr) {
      if (numbers[minPtr] < target - numbers[maxPtr]) {
        minPtr++;
      } else if (numbers[minPtr] + numbers[maxPtr] === target) {
        return [minPtr + 1, maxPtr + 1];
      } else {
        maxPtr--;
      }
    }

    // for (let i = 0; i < maxPtr; i++) {
    //     for (let j = i + 1; j <= maxPtr; j++) {
    //         if (numbers[i] + numbers[j] > target) {
    //             break;
    //         } else if (numbers[i] + numbers[j] === target) {
    //             return [i + 1, j + 1];
    //         }
    //     }
    // }
  }

  return [];
};