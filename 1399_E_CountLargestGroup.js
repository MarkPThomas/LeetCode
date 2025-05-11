// 2025/05/11
// O(n + m) or O(n * log(n)) time complexity
// O(m) or (log(n) space complexity
//  where m = order of magnitude + 9
// Time to complete: 6:42 min
// Patterns: Hashmap?
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function (n) {
  const groups = [];

  for (let i = 1; i <= n; i++) {
    const numString = i.toString();
    let sum = 0;

    for (const digit of numString) {
      sum += Number(digit);
    }

    if (groups[sum] === undefined) {
      groups[sum] = 0;
    }
    groups[sum]++;
  }

  let maxGroupSize = 0;
  for (let i = 1; i < groups.length; i++) {
    maxGroupSize = Math.max(maxGroupSize, groups[i]);
  }

  let maxGroupsOfMaxSize = 0;
  for (let i = 1; i < groups.length; i++) {
    if (groups[i] === maxGroupSize) {
      maxGroupsOfMaxSize++;
    }
  }

  return maxGroupsOfMaxSize;

  // // every set of 9, we get groups larger by +1,
  // // so mod 9
  // //  if mod 9 = 0
  // // max by size is 1 group @ 10
  // // max by group count is 9 groups @ 1 or 9 groups @ 2
  // //      group count decreases by 1 for each increase in #s in group
  // // # is amount >= last 10

  // if (n < 10) {
  //     return n;
  // }

  // const numString = n.toString();
  // const digitOnes = Number(numString[numString.length - 1]);
  // const digitTens = Number(numString[numString.length - 2]);

  // return digitOnes + 1 - Math.max(0, digitTens + digitOnes - 9);
};