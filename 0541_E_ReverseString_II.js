// 2024/04/22
// O(n + 0.5 (n / k)) time complexity
// O(1) space complexity (ignoring the O(n) that must be generated for output)
// Time to complete: 12:50 min
// Patterns: 2 Ptr
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  function reverseK(ptr1, ptr2, chars) {
    while (ptr1 < ptr2) {
      const temp = chars[ptr1];
      chars[ptr1] = chars[ptr2];
      chars[ptr2] = temp;

      ptr1++;
      ptr2--;
    }
  }

  const chars = s.split(''); // S: O(n)

  let isReversing = true;
  let ptr1 = 0;
  let ptr2 = 0;
  for (let i = 0; i < chars.length; i++) { // T: O(n)
    if (!((i + 1) % k)) {
      ptr2 = i;

      if (isReversing) {
        reverseK(ptr1, ptr2, chars);    // T: O(k)
      }

      ptr1 = i + 1;
      isReversing = !isReversing;
    }
  }

  if (chars.length - (ptr1 + 1) < k && isReversing) {
    reverseK(ptr1, chars.length - 1, chars);
  }

  return chars.join('');
};

// 2023/04
// Optimized & refactoreed solution
// O(n) time complexity
// O(1) space complexity (ignoring the O(n) that must be generated for output)
// Time to complete: 13 min (original) + 15 min refactoring/optimizing
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  if (k < 2) {
    return s;
  }

  const chars = [...s];
  let endIndex = 0;
  while (endIndex < chars.length) {
    endIndex = (endIndex === 0) ? k - 1 : endIndex += 2 * k;
    let startIndex = endIndex - (k - 1);
    swapChars(chars, startIndex, Math.min(chars.length, endIndex));
  }
  return chars.join('');
};

function swapChars(chars, startIndex, endIndex) {
  while (startIndex < endIndex) {
    const swap = chars[startIndex];
    chars[startIndex] = chars[endIndex];
    chars[endIndex] = swap;
    startIndex++;
    endIndex--;
  }
}

// O(n) time complexity
// O(1) space complexity (ignoring the O(n) that must be generated for output)
// Time to complete: 13 min
// Patterns: 2 pointers
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  if (k < 2) {
    return s;
  }

  const chars = [...s];
  let isReverse = true;
  let lastReverseIndex = -1;
  for (let i = 1; i <= chars.length; i++) {
    if (i % k === 0 || i === chars.length) {
      if (isReverse) {
        let startIndex = lastReverseIndex + 1;
        let endIndex = i - 1;
        while (startIndex < endIndex) {
          const swap = chars[startIndex];
          chars[startIndex] = chars[endIndex];
          chars[endIndex] = swap;
          startIndex++;
          endIndex--;
        }
      } else {
        lastReverseIndex = i - 1;
      }
      isReverse = !isReverse;
    }
  }

  return chars.join('');
};