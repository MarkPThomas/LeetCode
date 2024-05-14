// 2024/05/14
// O(n) time complexity
// O(1) space complexity
// Time to complete: 29:00 min (14:00 min)
// Patterns: 2 Pointers, Sliding Window
// Notes w.r.t. solution: Solved in 14 min, but was a bit sloppy including debugging.
//    Draw such things out!
/**
 * @param { number[] } arr
 * @return { void} Do not return anything, modify arr in -place instead.
**/
var duplicateZeros = function (arr) {
  // Get expected last index by counting
  let count = 0;
  let ptr1 = -1;
  for (let i = 0; i < arr.length; i++) {
    if (count < arr.length) {
      if (arr[i] === 0) {
        count += 2;
      } else {
        count += 1;
      }

      if (count >= arr.length) {
        ptr1 = i;
        break;
      }
    }
  }

  // Case: No zeros found
  if (ptr1 === -1 || ptr1 === arr.length - 1) {
    return;
  }

  // Starting from expected last index, moving forward:
  let ptr2 = arr.length - 1;

  // Adjust for case of non-duplicated 0 at end
  if (count > arr.length && arr[ptr1] === 0) {
    arr[arr.length - 1] = 0;
    ptr1--;
    ptr2--;
  }

  while (0 <= ptr1) {
    // move value to end of array
    arr[ptr2] = arr[ptr1];

    // if value is 0, duplicate once more moving forward
    if (arr[ptr2] === 0) {
      ptr2--;
      arr[ptr2] = 0;
    }

    ptr1--;
    ptr2--;
  }
};

// 2024/05/14
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 9:41 min
// Patterns: Naiive/brute force
// Notes w.r.t. solution:
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
  let ptr = 0;
  while (ptr < arr.length) {
    if (arr[ptr] === 0) {
      // copy all forward
      for (let j = arr.length - 2; j >= ptr; j--) {
        arr[j + 1] = arr[j];
      }
      ptr++;
    }
    ptr++;
  }
};