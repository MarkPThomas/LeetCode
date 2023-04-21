// O(n) time complexity
// O(1) space complexity
// Time to complete: 11 min total, 7 min after naiive solution tried
// Patterns: Greedy
// Notes w.r.t. solution: Naiive solution times out on some tests.

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPurchase = Infinity;
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    if (price < minPurchase) {
      minPurchase = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPurchase);
    }
  }
  return maxProfit;
};

// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 4 min
// Patterns: Naiive
// // Brute Force Solution
// /**
//  * @param {number[]} prices
//  * @return {number}
//  */
// var maxProfit = function(prices) {
//   let maxProfit = 0;
//   for (let buy = 0; buy < prices.length - 1; buy++) {
//       const bought = prices[buy];
//       for (let sell = buy + 1; sell < prices.length; sell++) {
//           const sold = prices[sell];
//           maxProfit = Math.max(maxProfit, sold - bought);
//       }
//   }
//   return maxProfit;
// };