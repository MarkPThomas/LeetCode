// 2025/06/11
// O(w * b * log(w * b)) time complexity
// O(w * b) space complexity
//  where w = # workers, b = # bikes, w * b = # distances
// Time to complete: 29:33 min
// Patterns: Priority Queue
// Notes w.r.t. solution: Lost a lot of time in beginning not using PQ, then handling ties ;-P
//  Slow down & read question more carefully.
/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {

  function getDistance(pt1, pt2) {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
  }

  const distances = new PriorityQueue((a, b) => {
    if (a.distance === b.distance) {
      if (a.worker === b.worker) {
        return a.bike - b.bike;
      } else {
        return a.worker - b.worker;
      }
    } else {
      return a.distance - b.distance;
    }
  });

  for (let worker = 0; worker < workers.length; worker++) {
    const workerPt = workers[worker];
    for (let bike = 0; bike < bikes.length; bike++) {
      const bikePt = bikes[bike];
      const distance = getDistance(workerPt, bikePt);
      distances.enqueue({ distance, worker, bike });
    }
  }

  const assignments = []; // ith worker = jth bike
  const bikesAssigned = new Set();
  let workersAssigned = 0;
  while (distances.size() && workersAssigned < workers.length) {
    const { _, worker, bike } = distances.dequeue();

    if (assignments[worker] !== undefined || bikesAssigned.has(bike)) {
      continue;
    }
    bikesAssigned.add(bike);

    assignments[worker] = bike;
    workersAssigned++;
  }

  return assignments;
};