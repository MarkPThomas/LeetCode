// 2025/04/05
// O(n * m) time complexity
// O(n) space complexity
//  where n = # children, m = max rating
// Time to complete: 36:58 min
// Patterns: Greedy
// Notes w.r.t. solution: Brute force fnished in 14:20.
//  BFS optimization @ 18:55.
//  Delays were getting TLEs until I found how to optimize checks correctly.
//  Final optimization was pre-sorting by rating & solving by min to max ratings.
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {

  function checkNeedsCandy(needsCandy) {

    while (needsCandy.length) {
      const needsMoreCandy = [];

      for (let i = 0; i < needsCandy.length; i++) {
        const child = needsCandy[i];
        const leftChild = child - 1;
        const rightChild = child + 1;

        let minLeft = 0;
        if (ratings[leftChild] < ratings[child] && !(candies[leftChild] < candies[child])) {
          // Give +1 more than left child
          minLeft = candies[leftChild] + 1;
        }

        let minRight = 0;
        if (ratings[child] > ratings[rightChild] && !(candies[child] > candies[rightChild])) {
          // Give +1 more than right child
          minRight = candies[rightChild] + 1;
        }

        // Give max of these
        const minCandy = Math.max(minLeft, minRight);

        if (minCandy) {
          candies[child] = minCandy;
          needsMoreCandy.push(child);
        }
      }

      needsCandy = needsMoreCandy;
    }
  }

  // each rating has min of 1
  const candies = Array(ratings.length).fill(1);

  // additional doled out by comparing each child to its neighbors
  // children w/ equal ratings to neighbors can end up with fewer candies

  // can this be determined by being higher than just 1 neighbor. Yes

  // while loop for adding candies?
  const children = [];
  for (let i = 0; i < ratings.length; i++) {
    children[i] = [i, ratings[i]];
  }

  // Process children by lowest rating to highest rating for fewer passes
  children.sort((a, b) => a[1] - b[1]);
  let needsCandy = [];
  for (const [i, _] of children) {
    needsCandy.push(i);
  }

  checkNeedsCandy(needsCandy);

  return candies.reduce((acc, val) => acc + val);
};

// ===== Solutions =====
// O(n) time complexity
// O(n) space complexity
// Patterns: Greedy
// Notes w.r.t. solution: 1 array, 2 passes
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const candies = Array(ratings.length).fill(1);

  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((acc, val) => acc + val);
};