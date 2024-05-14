// 2024/05/14
// O(n) time complexity
// O(n) space complexity
// Time to complete: 19:00 min
// Patterns: Stack, Simulation
// Notes w.r.t. solution: Didn't read problem carefully enough, wasted time on wrong implementations/solutions. Warming up to the day.
/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
  const scores = [];

  for (let i = 0; i < operations.length; i++) {
    if (!isNaN(parseInt(operations[i]))) {
      // add to record
      scores.push(parseInt(operations[i]));
    } else if (i > 1 && operations[i] === '+') {
      // add last 2 nums to score
      scores.push(scores[scores.length - 1] + scores[scores.length - 2]);
    } else if (i > 0 && operations[i] === 'D') {
      // add double of prior record to score
      scores.push(2 * scores[scores.length - 1]);
    } else if (i > 0 && operations[i] === 'C') {
      // remove previous record
      scores.pop();
    }
  }

  return scores.reduce((acc, val) => acc + val, 0);
};