// O(log(N)) time complexity
// O(1) space complexity
// Time to complete: 23:20 min
// Patterns: Binary search
// Notes w.r.t. solution: My binary search was a bit funky since I didn't have a proper sense of initial max/mins to start with (max = x/2, min = 2)

/**
 * @param {number} x
 * @return {number}
 */
 var mySqrt = function(x) {
  if (x < 2) {
      return x;
  }

  let getPivot = x => Math.floor(x / 2);
  let sqrt = getPivot(x);
  let lastSqrt = x;
  let squared = sqrt * sqrt;
  while (squared !== x && lastSqrt !== sqrt) {
      if (squared < x) {
          // increase unless within 1 int
          if (lastSqrt - sqrt < 2) {
              break;
          }
          sqrt += getPivot(lastSqrt - sqrt);
      } else {
          // decrease
          lastSqrt = sqrt;
          sqrt = getPivot(sqrt);
      }
      squared = sqrt * sqrt;
  }
  return sqrt;
};