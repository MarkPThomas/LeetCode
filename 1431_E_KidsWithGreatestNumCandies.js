// 2024/04/09
// O(n) time complexity
// O(1) space complexity
// Time to complete: 5:47 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const greatestCandies = [];

  let maxCandy = 0;
  candies.forEach((candy) => {
    maxCandy = Math.max(candy, maxCandy);
  })

  for (let i = 0; i < candies.length; i++) {
    let greatestCandy = candies[i] + extraCandies >= maxCandy;
    greatestCandies.push(greatestCandy);
  }

  return greatestCandies;
};

// 2023/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const result = new Array(candies.length);

  let maxCandy = 0;
  candies.forEach((candy) => {
    maxCandy = Math.max(maxCandy, candy);
  });

  for (let i = 0; i < result.length; i++) {
    const candy = candies[i];
    result[i] = (candy + extraCandies >= maxCandy);
  }

  return result;
};
