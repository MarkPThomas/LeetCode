// O(nLog(n)) time complexity
// O(1) space complexity
// Time to complete: 8:00 min.
// Patterns:
// Notes w.r.t. solution:

var largestPerimeter = function(nums) {
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