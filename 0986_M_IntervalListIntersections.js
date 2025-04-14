// 2025/04/13
// O(m + n) time complexity
// O(m + n) space complexity
//  where m = firstList length, n = secondList length
// Time to complete: 16:23 min
// Patterns: Merge Interval
// Notes w.r.t. solution:
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  const intersections = [];
  if (!firstList.length || !secondList.length) {
    return intersections;
  }

  let ptrA = 0;
  let ptrB = 0;
  while (ptrA < firstList.length && ptrB < secondList.length) {
    // Handle overlaps
    if (firstList[ptrA][0] <= secondList[ptrB][0]
      && firstList[ptrA][1] >= secondList[ptrB][0]) {
      // overlap w/ A first
      const start = secondList[ptrB][0];
      const end = Math.min(firstList[ptrA][1], secondList[ptrB][1]);
      intersections.push([start, end]);
    } else if (secondList[ptrB][0] <= firstList[ptrA][0]
      && secondList[ptrB][1] >= firstList[ptrA][0]) {
      // overlap w/ B first
      const start = firstList[ptrA][0];
      const end = Math.min(firstList[ptrA][1], secondList[ptrB][1]);
      intersections.push([start, end]);
    }

    // Handle increments by incrementing whichever ends first
    if (firstList[ptrA][1] < secondList[ptrB][1]) {
      ptrA++;
    } else if (firstList[ptrA][1] > secondList[ptrB][1]) {
      ptrB++;
    } else {
      ptrA++;
      ptrB++;
    }
  }

  return intersections;
};