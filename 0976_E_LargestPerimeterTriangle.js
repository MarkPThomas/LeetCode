// 2024/04/15
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 7:57
// Patterns: Math
// Notes w.r.t. solution: This problem is dumb
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
  nums.sort((a, b) => b - a);

  for (let i = 0; i < nums.length - 2; i++) {
    const side1 = nums[i];
    if (!side1) {
      break;
    }

    const side2 = nums[i + 1];
    const side3 = nums[i + 2];

    if (side1 < side2 + side3) {
      return side1 + side2 + side3;
    }
  }

  return 0;
};

// 2023/05
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 18:00
// Patterns: Math
// Notes w.r.t. solution: If sorting is not disallowed, don't forget to consider sorting to shorten time!
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
  // Side 3, as the longest side, must always be less than sides 1 + 2
  // i.e. max side length < 0.5 * perimeter
  // longest perimeter is longest side + next 2 longest sides
  // with descending sorted array [a, b, c, d], if a is too large for the hypotenuse w/ b & c, no other sides
  //    will be valid. Because of this, once sorted, we only check 3 contiguous values and slide this window
  //    as needed
  nums.sort((a, b) => b - a);
  let side1;
  let side2;
  let side3;
  for (let i = 0; i < nums.length - 2; i++) {
    side1 = nums[i];
    side2 = nums[i + 1];
    side3 = nums[i + 2];
    if (side1 < side2 + side3) {
      return side1 + side2 + side3;
    }
  }

  return 0;
};

// 2022
// O(nLog(n)) time complexity
// O(1) space complexity
// Time to complete: 8:00 min.
// Patterns:
// Notes w.r.t. solution:
var largestPerimeter = function (nums) {
  // largest perimeter = 3 largest segments added together
  // array is comprised of segment lengths

  // segments must form a triangle w/ non-zero area
  //      no 0 or negative #s
  //      a + b > c where a <= b <= c (c = hypotenuse)
  //      stricter validation not possible without knowing slopes of segments

  nums.sort((a, b) => a - b);
  for (let i = nums.length - 3; i >= 0; i--) {
    // a <= b <= c
    let a = nums[i];
    let b = nums[i + 1];
    let c = nums[i + 2];

    // Valid if a + b > c (not strictly correct, but first pass validation)
    if (a + b > c) {
      return a + b + c;
    }
  }

  return 0; // 4:53
};