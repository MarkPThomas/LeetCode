// 2025/05/13
// O(n) time complexity
// O(n) space complexity
// Time to complete: 22:38 min
// Patterns: Hashmap/Bucket Sort
// Notes w.r.t. solution:
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  const deltaRiders = {};
  for (const trip of trips) {
    deltaRiders[trip[1]] ??= 0;
    deltaRiders[trip[1]] += trip[0];

    deltaRiders[trip[2]] ??= 0;
    deltaRiders[trip[2]] -= trip[0];
  }

  let filled = 0;
  for (const riders of Object.values(deltaRiders)) {
    filled += riders;
    if (filled > capacity) {
      return false;
    }
  }

  return true;
};

// 2025/05/13
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 22:38 min
// Patterns: 2 Heaps
// Notes w.r.t. solution:
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  // similar to merge intervals problem
  // sort by start mileage
  // iterate, adding @ start mileage, then
  //  if next start mileage < prev end mileage
  //      add next passengers
  //  else
  //      subtract prev passengers

  // or 2 min heaps, one by pickup mileage, another by dropoff mileage
  // select min from either heap, adding or subtracting as we go.
  const pickups = new PriorityQueue((a, b) => a[1] - b[1]);
  const dropoffs = new PriorityQueue((a, b) => a[2] - b[2]);
  for (let i = 0; i < trips.length; i++) {
    pickups.enqueue(trips[i]);
    dropoffs.enqueue(trips[i]);
  }

  let filled = 0;
  while (pickups.size() && dropoffs.size()) {
    const pickup = (pickups.front()[1] <= dropoffs.front()[2]) ? pickups.front()[0] : 0;
    const dropoff = (dropoffs.front()[2] <= pickups.front()[1]) ? dropoffs.front()[0] : 0;

    filled += pickup - dropoff;
    if (filled > capacity) {
      return false;
    }

    if (pickups.front()[1] < dropoffs.front()[2]) {
      pickups.dequeue();
    } else if (dropoffs.front()[2] < pickups.front()[1]) {
      dropoffs.dequeue();
    } else {
      pickups.dequeue();
      dropoffs.dequeue();
    }
  }

  return true;
};