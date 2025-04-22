// 2025/04/16
// O(l + y) time complexity
// O(y) space complexity
//  where l = # logs, y = # years
// Time to complete: 9:40 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number[][]} logs
 * @return {number}
 */
var maximumPopulation = function (logs) {
  // births
  // once deaths
  // count births, subtract deaths
  const years = {};
  for (const [birth, death] of logs) {
    years[birth] ??= 0;
    years[birth]++;

    years[death] ??= 0;
    years[death]--;
  }

  let currPopulation = 0;
  let maxPopulation = 0;
  let maxPopulationYear = 0;
  for (const [year, count] of Object.entries(years)) {
    currPopulation += count;

    if (currPopulation > maxPopulation) {
      maxPopulation = currPopulation;
      maxPopulationYear = Number(year);
    }
  }

  return maxPopulationYear;
};