// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:



// Bellman-Ford Naiive
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  let prev = Array(n).fill(Infinity);
  let curr = Array(n).fill(Infinity);
  prev[src] = 0;

  for (let stops = 0; stops <= k; stops++) {
    for (const flight of flights) {
      const [prevFlight, currFlight, cost] = flight;
      if (prev[prevFlight] < Infinity) {
        curr[currFlight] = Math.min(curr[currFlight],
          prev[prevFlight] + cost);
      }
    }

    prev = [...curr];
  }

  return curr[dst] === Infinity ? -1 : curr[dst];
};


// Bellman-Ford SPFA
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  if (src === dst) {
    return 0;
  }

  const pricesFrom = {};
  for (const flight of flights) {
    const [prevCity, currCity, cost] = flight;
    if (!pricesFrom[prevCity]) {
      pricesFrom[prevCity] = [];
    }
    pricesFrom[prevCity].push([currCity, cost]);
  }

  const minCost = Array(n).fill(Infinity);
  const queue = [[src, 0]];

  let stops = 0;
  while (stops <= k && queue.length) {
    let nextCitiesCount = queue.length;
    while (nextCitiesCount) {
      const [currCity, currCost] = queue.shift();
      nextCitiesCount--;

      if (!pricesFrom[currCity]) {
        continue;
      }

      for (const flight of pricesFrom[currCity]) {
        const [nextCity, nextCost] = flight;
        const totalPrice = currCost + nextCost;

        if (minCost[nextCity] > totalPrice) {
          minCost[nextCity] = totalPrice;
          queue.push([nextCity, minCost[nextCity]]);
        }
      }
    }

    stops++;
  }

  return minCost[dst] === Infinity ? -1 : minCost[dst];
};

// Dijktra
