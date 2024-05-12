// 2024/05/12
// O(log(n)) time complexity
// O(1) space complexity
// Time to complete: 3:48 min
// Patterns: Math
// Notes w.r.t. solution: Started to get smart, then realized naiive solution is probably best
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  // each odd - 1 makes it even for next iteration
  // each even / 2 makes it odd unless multiple of 4

  let numSteps = 0;
  while (num) {
    if (num % 2 === 0) {
      num /= 2;
    } else {
      num -= 1;
    }
    numSteps++;
  }

  return numSteps;
};