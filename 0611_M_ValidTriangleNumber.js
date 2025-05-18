// 2025/05/18
// O(n^2) time complexity
// O(n) space complexity (for sorting)
// Time to complete: OT min
// Patterns: 2 Pointer
// Notes w.r.t. solution: Forgot about triangle identities, ran w/ assuming right triangles.
//  Was fast & sloppy. Working out logic more carefully would have yielded solution in time.
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  // Sort nums
  // a + b > c
  // a + c > b => c > b - a
  // b + c > a => c > a - b
  //  => c > (max(b - a, a - b) < b or a)
  // w/ sorted array, a < b < c, we only care about Cs where b < c < a + b
  //  => # triangles = idxAPlusB - idxB - 1;

  nums.sort((a, b) => a - b);
  let numTriangles = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === 0) {
      continue;
    }

    for (let j = i + 1; j < nums.length - 1; j++) {
      let k = j + 1;
      while (k < nums.length && nums[i] + nums[j] > nums[k]) {
        numTriangles++;
        k++;
      }
    }
  }

  return numTriangles;
};