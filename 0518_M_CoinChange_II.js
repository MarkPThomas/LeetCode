// 2024/12/27
// O(c * n) time complexity
// O(n) space complexity
//  where n = amount, c = # coins
// Time to complete: OT min
// Patterns: Dynamic Programming (Iteration, Counting)
// Notes w.r.t. solution: Looked at answer :-P
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  coins.sort((a, b) => a - b);

  const combos = Array(amount + 1).fill(0);
  combos[0] = 1;

  for (const coin of coins) {
    for (let sum = coin; sum <= amount; sum++) {
      combos[sum] += combos[sum - coin];
    }
  }

  return combos[amount];
};

// 2024/12/27
// O() time complexity
// O(1) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming (Iteration, Counting)
// Notes w.r.t. solution: I was close! Incomplete solution below.
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  coins.sort((a, b) => a - b);

  const combos = Array(amount + 1).fill(0);
  combos[0] = 1;

  for (let sum = 1; sum <= amount; sum++) {
    let ways = 0;
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] > sum) {
        break;
      }

      ways = Math.max(ways, combos[sum - coins[i]]);

      // if (sum % coins[i] === 0) {
      if (coins[i] === sum) {
        ways++;
      }
    }

    // for (let i = 0; i < coins.length; i++) {
    //     if (coins[i] > sum) {
    //         break;
    //     }

    //     // if (sum - coins[i] === 0) {
    //     //     ways++;
    //     // }

    //     let maxWays = 0;
    //     for (let j = i; j >= 0; j--) {
    //         // maxWays += combos[sum - coins[j]];
    //         maxWays = Math.max(maxWays, combos[sum - coins[j]]);
    //     }

    //     ways += maxWays;
    //     // ways = maxWays;
    // }
    combos[sum] = ways;
  }

  return combos[amount];
};


// 2021/??/??
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  if (amount < 0) {
    return 0;
  }

  const counter = Array(amount + 1).fill(0);
  counter[0] = 1;

  coins.forEach((coinValue) => {
    for (let subTotal = coinValue; subTotal <= amount; subTotal++) {
      counter[subTotal] += counter[subTotal - coinValue];
    }
  });
  return counter[amount];
};