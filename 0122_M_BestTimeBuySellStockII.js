// 2025/01/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Greedy, Kadane's Alg.
// Notes w.r.t. solution: Worked out solution.
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxProfit = 0;
  for (let day = 0; day < prices.length - 1; day++) {
    if (prices[day + 1] > prices[day]) {
      maxProfit += prices[day + 1] - prices[day];
    }
  }

  return maxProfit;
};

// 2025/01/06
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Greedy - Peaks & Valleys
// Notes w.r.t. solution: Worked out solution.
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let day = 0;
  let valley = prices[day];
  let peak = prices[day];
  let maxProfit = 0;

  while (day < prices.length - 1) {
    // Get valley
    while (day < prices.length - 1 && prices[day] >= prices[day + 1]) {
      day++;
    }
    valley = prices[day];

    // Get next peak
    while (day < prices.length - 1 && prices[day] <= prices[day + 1]) {
      day++;
    }
    peak = prices[day];

    maxProfit += peak - valley;
  }

  return maxProfit;
};

// 2025/01/04
// O(n) time complexity
// O(n) space complexity
//  where n = # prices
// Time to complete: xx min
// Patterns: Dynamic Programming - State Transition by Inaction
// Notes w.r.t. solution: Worked out solution.
//  TLE @ 199/200
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const memo = Array(prices.length).fill().map(   // days state
    () => Array(2).fill(0));                // holding state

  return dp(0, 1);

  function dp(day, canBuy) {
    if (day === prices.length) {
      return 0; // Base case. We are done.
    }

    if (memo[day][canBuy]) {
      return memo[day][canBuy];
    }

    const nextDay = day + 1;
    const profitWait = dp(nextDay, canBuy);

    let profitAct = 0; // Profit if we can't buy or sell
    if (canBuy) { // Buy
      profitAct = dp(nextDay, 0) - prices[day];
    } else { // Sell
      profitAct = dp(nextDay, 1) + prices[day];
    }

    memo[day][canBuy] = Math.max(profitAct, profitWait);

    return memo[day][canBuy];
  }
};