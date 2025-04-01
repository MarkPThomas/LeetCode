// 2025/04/01
// O((n * + k) * log(n)) time complexity
// O(n) space complexity
// Time to complete: 18:24 min
// Patterns: Greedy, 2 Heaps
// Notes w.r.t. solution:
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  // at most k projects
  // w initial capital
  // n projects of profit[i] & capital[i] (i.e. cost)
  // w > capital[i] for each iteration up to k
  // w += profit[i] for i chosen in each iteration up to k

  // Get most affordable projects
  const minCosts = new PriorityQueue((a, b) => a[1] - b[1]);
  for (let i = 0; i < capital.length; i++) {
    minCosts.enqueue([i, capital[i]]);
  }

  const maxProfit = new PriorityQueue((a, b) => b - a);
  for (let i = 0; i < k; i++) {
    // Get most profitable affordable projects
    while (minCosts.size() && w >= minCosts.front()[1]) {
      const candidate = minCosts.dequeue()[0];
      maxProfit.enqueue(profits[candidate]);
    }

    // Finished most affordable project, update capital
    if (!maxProfit.size()) {
      break;
    }

    w += maxProfit.dequeue();
  }

  return w;

};