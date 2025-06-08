// 2025/06/07
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 9:42 min
// Patterns: Greedy, 2 Pointer
// Notes w.r.t. solution:
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  // boatLimit = 2 ppl or sumPpl <= limit
  // max efficiency is 2 ppl @ p1 + p2 = limit
  //  small p1 & small p2 << limit
  //  large p1 && large p2 >> limit
  //  small p1 & large p2 = limit
  // => sort people, select P1 from left side, P2 from right side
  //  maximizes odds of fitting 2 people within weight limit while maximizing weight
  people.sort((a, b) => a - b);
  let numBoats = 0;

  let light = 0;
  let heavy = people.length - 1;
  while (light <= heavy) {
    if (light !== heavy && people[light] + people[heavy] <= limit) {
      // 1 light & 1 heavy person can fit
      light++;
      heavy--;
    } else {
      // only 1 heavy person can fit
      heavy--;
    }
    numBoats++;
  }

  return numBoats;
};