// 2024/11/27
// O(n * e) time complexity
// O(n) space complexity
//  where n = # nodes
//    e = # edges
// Time to complete: 7:08 refactor from prev solution
// Patterns: Shortest Path - Bellman-Ford Algorithm
// Notes w.r.t. solution:
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {

  function timesUpdate(times, prev, curr) {
    let hasUpdate = false;

    for (const [from, to, time] of times) {
      if (prev[from] < Infinity && prev[from] + time < curr[to]) {
        curr[to] = prev[from] + time;
        hasUpdate = true;
      }
    }

    return hasUpdate;
  }

  const minTimes = Array(n + 1).fill(Infinity);
  minTimes[0] = 0;
  minTimes[k] = 0;

  // // More verbose, failsafe in case of negative weight cycles
  // for (let steps = 0; steps < n; steps++) {
  //     if (!timesUpdate(times, [...curr], curr)) {
  //         break;
  //     }
  // }

  // Simpler, if we know there are no negative weight cycles present
  while (timesUpdate(times, [...minTimes], minTimes)) { }

  let maxTime = 0;
  for (const time of Object.values(minTimes)) {
    maxTime = Math.max(maxTime, time);
  }

  return maxTime === Infinity ? -1 : maxTime;
};


// 2024/11/27
// O(n * e) time complexity
// O(n + e) space complexity
//  where n = # nodes
//    e = # edges
// Time to complete: 5:00 refactor from prev solution
// Patterns: Shortest Path - SPFA
// Notes w.r.t. solution:
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {

  function getAdjacencies(times) {
    const adjacencies = {};
    for (const [from, to, time] of times) {
      if (!adjacencies[from]) {
        adjacencies[from] = [];
      }
      adjacencies[from].push([to, time]);
    }
    return adjacencies;
  }

  function timesUpdate(adjacencies, from, fromTime, minTimes, neighbors) {
    for (const [to, time] of adjacencies[from]) {
      const newTime = fromTime + time;

      if (!minTimes.hasOwnProperty(to) || minTimes[to] > newTime) {
        minTimes[to] = newTime;
        neighbors.push([to, newTime]);
      }
    }
  }

  const adjacencies = getAdjacencies(times);
  const minTimes = Array(n + 1).fill(Infinity);
  minTimes[0] = 0;
  minTimes[k] = 0;

  const neighbors = [[k, 0]];
  while (neighbors.length) {
    const [from, fromTime] = neighbors.pop();
    if (!adjacencies[from]) {
      continue;
    }

    timesUpdate(adjacencies, from, fromTime, minTimes, neighbors);
  }

  let maxTime = 0;
  for (const time of Object.values(minTimes)) {
    maxTime = Math.max(maxTime, time);
  }

  return maxTime === Infinity ? -1 : maxTime;
};

// 2024/11/22
// O(n + e * log(n)) time complexity
// O(n + e) space complexity
//  where n = # nodes
//    e = # edges
// Time to complete: OT min ~ 1 hr?
// Patterns: Shortest Path - Dijkstra's Algorithm
// Notes w.r.t. solution: Solved in 25:30 with some minor errors. Was mostly on track.
/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {

  function getAdjacencies(times) {
    const adjacencies = {};
    for (const [from, to, time] of times) {
      if (!adjacencies[from]) {
        adjacencies[from] = [];
      }
      adjacencies[from].push([to, time]);
    }
    return adjacencies;
  }

  function timesUpdate(adjacencies, from, minTimes, neighbors) {
    for (const [to, time] of adjacencies[from]) {
      const newTime = minTimes[from] + time;

      if (!minTimes.hasOwnProperty(to) || minTimes[to] > newTime) {
        minTimes[to] = newTime;
        neighbors.enqueue(to);
      }
    }
  }

  const adjacencies = getAdjacencies(times);
  const minTimes = Array(n + 1).fill(Infinity);
  minTimes[0] = 0;
  minTimes[k] = 0;

  const neighbors = new PriorityQueue({ compare: (a, b) => a[1] - b[1] });
  neighbors.enqueue(k);
  while (neighbors.size()) {
    const from = neighbors.dequeue();
    if (!adjacencies[from]) {
      continue;
    }

    timesUpdate(adjacencies, from, minTimes, neighbors);
  }

  let maxTime = 0;
  for (const time of Object.values(minTimes)) {
    maxTime = Math.max(maxTime, time);
  }

  return maxTime === Infinity ? -1 : maxTime;
};