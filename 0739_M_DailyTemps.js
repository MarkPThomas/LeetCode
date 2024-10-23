// 2024/10/23
// O(n) time complexity
// O(n) space complexity
// Time to complete: 34:04 min
// Patterns: Stack
// Notes w.r.t. solution: 3 failed attempts before realizing the solution.
//  Would have found it earlier if I had diagrammed more & didn't jump into coding.
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const answer = [];

  const stack = [];
  for (let idx = 0; idx < temperatures.length; idx++) {
    while (stack.length && temperatures[idx] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      answer[prevIdx] = idx - prevIdx;
    }

    stack.push(idx);
  }

  // Handle tail values that never got exceeded temp
  while (stack.length) {
    const idx = stack.pop();
    answer[idx] = 0;
  }

  return answer;
};