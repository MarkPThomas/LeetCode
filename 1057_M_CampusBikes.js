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

// ===== Solutions =====
// O(w * b * log(w * b)) time complexity
// O(w * b) space complexity
//  where w = # workers, b = # bikes, w * b = # distances
// Patterns: Sort
/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {

  function getDistance(pt1, pt2) {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
  }

  const comparator = (a, b) => {
    if (a.distance === b.distance) {
      if (a.worker === b.worker) {
        return a.bike - b.bike;
      } else {
        return a.worker - b.worker;
      }
    } else {
      return a.distance - b.distance;
    }
  };

  const allPossiblePairs = [];
  for (let worker = 0; worker < workers.length; worker++) {
    for (let bike = 0; bike < bikes.length; bike++) {
      const distance = getDistance(workers[worker], bikes[bike]);

      allPossiblePairs.push({
        worker,
        bike,
        distance
      });
    }
  }

  allPossiblePairs.sort(comparator);

  const assignments = []; // ith worker = jth bike
  const bikesAssigned = new Set();
  for (const { worker, bike, _ } of allPossiblePairs) {

    if (assignments[worker] !== undefined || bikesAssigned.has(bike)) {
      continue;
    }
    bikesAssigned.add(bike);

    assignments[worker] = bike;
  }

  return assignments;
};

// O(w * b + d) time complexity
// O(w * b + d) space complexity
//  where w = # workers, b = # bikes, w * b = # distances, d = range of distances
// Patterns: Bucket Sort
/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {

  function getDistance(pt1, pt2) {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
  }

  let minDistance = Infinity;
  const allPossiblePairs = {};
  for (let worker = 0; worker < workers.length; worker++) {
    for (let bike = 0; bike < bikes.length; bike++) {
      const distance = getDistance(workers[worker], bikes[bike]);

      allPossiblePairs[distance] ??= [];
      allPossiblePairs[distance].push({
        worker,
        bike
      });

      minDistance = Math.min(minDistance, distance);
    }
  }

  const assignments = []; // ith worker = jth bike
  const bikesAssigned = new Set();
  let currDistance = minDistance;
  let workersAssigned = 0;
  while (workersAssigned !== workers.length) {
    // From min distance to max, only @ distances recorded
    if (!(currDistance in allPossiblePairs)) {
      currDistance++;
      continue;
    }

    for (const { worker, bike } of allPossiblePairs[currDistance]) {

      if (assignments[worker] !== undefined || bikesAssigned.has(bike)) {
        continue;
      }
      bikesAssigned.add(bike);

      assignments[worker] = bike;
      workersAssigned++;
    }
    currDistance++;
  }

  return assignments;
};

// O(w * b * log(b)) time complexity
// O(w * b) space complexity
//  where w = # workers, b = # bikes, w * b = # distances
// Patterns: Priority Queue
/**
 * @param {number[][]} workers
 * @param {number[][]} bikes
 * @return {number[]}
 */
var assignBikes = function (workers, bikes) {
  const workerToBikeList = [];
  const closestBikeIdx = [];

  function getDistance(pt1, pt2) {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
  }

  const comparator = (a, b) => {
    if (a.distance === b.distance) {
      if (a.worker === b.worker) {
        return a.bike - b.bike;
      } else {
        return a.worker - b.worker;
      }
    } else {
      return a.distance - b.distance;
    }
  };

  function addClosestBike(assignmentsQueue, worker) {
    const { bike, distance } = workerToBikeList[worker][closestBikeIdx[worker]];
    closestBikeIdx[worker]++;

    assignmentsQueue.enqueue({
      worker,
      bike,
      distance
    });
  }

  const assignmentsQueue = new PriorityQueue(comparator);
  for (let worker = 0; worker < workers.length; worker++) {
    const bikeList = [];
    for (let bike = 0; bike < bikes.length; bike++) {
      const distance = getDistance(workers[worker], bikes[bike]);

      bikeList.push({ distance, bike });
    }
    bikeList.sort((a, b) => a.distance - b.distance);

    workerToBikeList.push(bikeList);
    closestBikeIdx.push(0); // 1st bike is closest for each worker
    addClosestBike(assignmentsQueue, worker);
  }

  const assignments = []; // ith worker = jth bike
  const bikesAssigned = new Set();
  while (assignmentsQueue.size()) {
    const { worker, bike, _ } = assignmentsQueue.dequeue();

    if (assignments[worker] !== undefined || bikesAssigned.has(bike)) {
      addClosestBike(assignmentsQueue, worker);
    } else {
      bikesAssigned.add(bike);
      assignments[worker] = bike;
    }
  }

  return assignments;
};