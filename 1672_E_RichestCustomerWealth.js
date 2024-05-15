// O(n * m) time complexity
// O(1) space complexity
// where n = # accounts, m = # banks
// Time to complete: 2:01 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  let maxWealth = 0;

  accounts.forEach((banks) => {
    wealth = banks.reduce((acc, val) => acc + val, 0);
    maxWealth = Math.max(maxWealth, wealth);
  })

  return maxWealth;
};