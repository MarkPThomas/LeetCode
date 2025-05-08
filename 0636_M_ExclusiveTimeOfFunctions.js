// 2025/05/08
// O(m) time complexity
// O(m) space complexity
//  where m = # logs
// Time to complete: 20:47 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
  const END = 'end';

  const funcTimes = Array(n).fill(0);

  const stack = [];
  for (const log of logs) {
    const [func, status, timestamp] = log.split(':');

    if (status === END) {
      const [timeStart, timePause] = stack.pop();

      const duration = timestamp - timeStart + 1;
      funcTimes[func] += duration - timePause;

      if (stack.length) {
        stack[stack.length - 1][1] += duration;
      }
    } else {
      stack.push([timestamp, 0]);
    }
  }

  return funcTimes;
};