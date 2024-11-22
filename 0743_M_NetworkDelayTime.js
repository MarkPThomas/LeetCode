// 2024/11/22
// O(n + e^2 * log(n)) time complexity (would be n + e * log(n) if using heap rather than re-sorting)
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
  const adjacencies = {};
  for (const [from, to, time] of times) {
    if (!adjacencies[from]) {
      adjacencies[from] = [];
    }
    adjacencies[from].push([to, time]);
  }

  const minTimes = {};
  minTimes[k] = 0;
  const neighbors = [k];
  while (neighbors.length) {
    const from = neighbors.pop();
    if (!adjacencies[from]) {
      continue;
    }

    let nodesAdded = false;
    for (const [to, time] of adjacencies[from]) {
      const newTime = minTimes[from] + time;

      if (!minTimes.hasOwnProperty(to) || minTimes[to] > newTime) {
        minTimes[to] = newTime;
        neighbors.push(to);
        nodesAdded = true;
      }
    }

    if (nodesAdded) {
      neighbors.sort((a, b) => a[1] - b[1]);
    }
  }

  if (Object.keys(minTimes).length === n) {
    let maxTime = 0;
    for (const time of Object.values(minTimes)) {
      maxTime = Math.max(maxTime, time);
    }
    return maxTime;
  } else {
    return -1;
  }
};