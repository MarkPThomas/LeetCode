// 2025/02/11
// O((n + m) * log(n + m)) time complexity
// O(n + m) space complexity
//  where n = # houses, m = # connections
// Time to complete: NA min
// Patterns: Prim's Algorithm w/ PQs
// Notes w.r.t. solution: Worked solution
/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */
var minCostToSupplyWater = function (n, wells, pipes) {
  // Sort edges by ascending cost
  const orderedEdges = new PriorityQueue({ compare: (a, b) => a[0] - b[0] });

  const graph = {};
  for (let i = 0; i < n + 1; i++) {
    graph[i] ??= [];
  }

  // Add virtual vertex & edges weighted by well costs
  for (let i = 0; i < wells.length; i++) {
    const virtualEdge = [wells[i], i + 1];

    orderedEdges.enqueue(virtualEdge);
    graph[0].push(virtualEdge);
  }

  // Add bidirectional edges weighted by pipe costs
  for (const [house1, house2, cost] of pipes) {
    graph[house1].push([cost, house2]);
    graph[house2].push([cost, house1]);
  }

  const visited = new Set();
  visited.add(0);

  let totalCost = 0;
  while (visited.size < n + 1) {
    const [cost, nextHouse] = orderedEdges.dequeue();
    if (visited.has(nextHouse)) {
      continue;
    }
    visited.add(nextHouse);

    totalCost += cost;

    for (const [adjCost, adjHouse] of graph[nextHouse]) {
      if (!visited.has(adjHouse)) {
        orderedEdges.enqueue([adjCost, adjHouse]);
      }
    }
  }

  return totalCost;
};

// 2025/02/11
// O((n + m) * log(n + m)) time complexity
// O(n + m) space complexity
//  where n = # houses, m = # connections
// Time to complete: NA min
// Patterns: Kruskal's Algorithm w/ DSU
// Notes w.r.t. solution: Worked solution
/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */
var minCostToSupplyWater = function (n, wells, pipes) {
  // Add virtual vertex & edges weighted by well costs
  const orderedEdges = []; // [pt1, pt2, cost]
  for (let i = 0; i < wells.length; i++) {
    orderedEdges.push([0, i + 1, wells[i]]);
  }

  // Add edges weighted by pipe costs
  for (const pipe of pipes) {
    orderedEdges.push(pipe);
  }

  // Sort edges by ascending cost
  orderedEdges.sort((a, b) => a[2] - b[2]);

  const dsu = new DSU(n);
  let totalCost = 0;
  for (const [house1, house2, cost] of orderedEdges) {
    if (dsu.union(house1, house2)) {
      totalCost += cost;
    }
  }

  return totalCost;
};

class DSU {
  constructor(n) {
    this.roots = [];
    this.ranks = [];
    for (let i = 0; i < n + 1; i++) {
      this.roots[i] = i;
      this.ranks[i] = 0;
    }
  }

  find(x) {
    if (x !== this.roots[x]) {
      this.roots[x] = this.find(this.roots[x]);
    }
    return this.roots[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    if (rootX === rootY) {
      return false;
    }

    if (this.ranks[rootX] > this.ranks[rootY]) {
      const swap = rootX;
      rootX = rootY;
      rootY = swap;
    }

    this.roots[rootX] = rootY;
    this.ranks[rootY] += this.ranks[rootX];

    return true;
  }
}


// 2025/02/11
// O() time complexity
// O(1) space complexity
// Time to complete: 54:13 min @ 10/40
// Patterns: DSU
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */
var minCostToSupplyWater = function (n, wells, pipes) {
  // in DSU, cost for each set is cost of pipes + min well
  // merge sets if pipe to connect any < max well of the 2
  const connections = new DSU(n, wells);

  // Got me to 10/40 @ 51:15 min
  for (const [house1, house2, cost] of pipes) {
    connections.union(house1, house2, cost)
  }

  // // Attempt to solve next failing problem
  // let housesJoined = false;
  // do {
  //   housesJoined = false;
  //   for (const [house1, house2, cost] of pipes) {
  //     if (connections.union(house1, house2, cost)) {
  //       housesJoined = true;
  //     }
  //   }
  // } while (housesJoined)

  return connections.totalCost();
};

class DSU {
  constructor(n, wells) {
    this.roots = [];
    this.ranks = [];
    this.wellCosts = [];
    for (let i = 1; i <= n; i++) {
      this.roots[i] = i;
      this.wellCosts[i] = wells[i - 1];
      // Rank is the cost of connecting the houses
      // Each house is initially its own root w/ a well
      // Rank is the total pipe costs + min well cost of the set of houses
      this.ranks[i] = this.wellCosts[i];
    }
  }

  find(house) {
    if (house !== this.roots[house]) {
      this.roots[house] = this.find(this.roots[house]);
    }
    return this.roots[house];
  }

  union(house1, house2, pipeCost) {
    let root1 = this.find(house1);
    let root2 = this.find(house2);

    if (root1 === root2) {
      return false;
    }

    // For simplicity, keep 1 as the cheaper well
    if (this.wellCosts[root1] > this.wellCosts[root2]) {
      const swap = root1;
      root1 = root2;
      root2 = swap;
    }

    // Join if connection is cheaper than current most expensive well
    if (pipeCost < this.wellCosts[root2]) {
      this.roots[root2] = root1;

      // Add root2 costs to root1, plus the new connection, minus the well we don't need
      this.ranks[root1] += (this.ranks[root2] + pipeCost - this.wellCosts[root2]);
      return true;
    } else {
      return false;
    }
  }

  totalCost() {
    let cost = 0;
    for (let i = 1; i < this.roots.length; i++) {
      const root = this.roots[i];
      // Add costs at well
      if (root === i) {
        cost += this.ranks[i];
      }
    }

    return cost;
  }
}