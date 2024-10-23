// 2024/10/22
// O(l * log(l) + l + m) = O(l * log(l)) time complexity
// O(f + log(l)) space complexity (for checking all logs + sorting logs)
//  where l = # logs, f = # of friends
// Time to complete: 23:30 min
// Patterns: Graph, DSU
// Notes w.r.t. solution: Solved in 13:42 but had minor error to debug in find (equality incorrect) & in union (no equality check) :-P
/**
 * @param {number[][]} logs
 * @param {number} n
 * @return {number}
 */
var earliestAcq = function (logs, n) {
  // Optimization: Not enough connections to join all nodes
  if (logs.length < n - 1) {
    return -1;
  }

  const network = new DSU(n);

  // logs[i] = [timestampi, xi, yi]
  logs.sort((a, b) => a[0] - b[0]);

  for (const log of logs) {
    // Note: Could have just check true/false union state,
    //      but this was a good excuse to actually play with rank data beyond unions
    network.union(log[1], log[2]);
    if (network.maxRank === n) {
      return log[0];
    }
  }

  return -1;
};

class DSU {
  constructor(n) {
    this.roots = [];
    this.ranks = [];
    this.maxRank = 1;
    for (let i = 0; i < n; i++) {
      this.roots[i] = i;
      this.ranks[i] = 1;
    }
  }

  find(x) {
    if (this.roots[x] !== x) {
      this.roots[x] = this.find(this.roots[x]);
    }
    return this.roots[x];
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot !== parentRoot) {
      if (this.ranks[childRoot] > this.ranks[parentRoot]) {
        const swap = childRoot;
        childRoot = parentRoot;
        parentRoot = swap;
      }

      this.roots[childRoot] = parentRoot;

      this.ranks[parentRoot] += this.ranks[childRoot];
      if (this.ranks[parentRoot] > this.maxRank) {
        this.maxRank = this.ranks[parentRoot];
      }
    }
  }
}