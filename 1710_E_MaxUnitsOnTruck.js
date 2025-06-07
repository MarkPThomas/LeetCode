// 2025/06/07
// O(n + m) -> O(n) time complexity
// O(m) -> O(n) space complexity
//  where n = # boxes types, m = # different box capacities
// Time to complete: 9:47 min
// Patterns: Greedy
// Notes w.r.t. solution:
/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  // # boxes, # units/box
  // fill the truck w/ boxes of max # units, descending as we use up boxes
  const boxesByUnits = {};
  for (const [numberOfBoxes, numberOfUnitsPerBox] of boxTypes) {
    boxesByUnits[numberOfUnitsPerBox] ??= 0;
    boxesByUnits[numberOfUnitsPerBox] += numberOfBoxes;
  }
  const numUnits = Object.keys(boxesByUnits).sort((a, b) => b - a);

  let unitsInTruck = 0;
  let boxesInTruck = 0;
  for (const numUnit of numUnits) {
    const numBoxes = boxesByUnits[numUnit];

    if (boxesInTruck + numBoxes <= truckSize) {
      boxesInTruck += numBoxes;
      unitsInTruck += numBoxes * numUnit;
    } else {
      unitsInTruck += (truckSize - boxesInTruck) * numUnit;
      boxesInTruck = truckSize;
    }
  }
  return unitsInTruck;
};