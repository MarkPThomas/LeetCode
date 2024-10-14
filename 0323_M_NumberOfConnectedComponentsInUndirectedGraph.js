// 2024/10/14
// O(n + m) time complexity
// O(n) space complexity
//  where n = # nodes, m = # edges
// Time to complete: 7:29 min
// Patterns: Graph, DSU
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const dsu = new DSU(n);
  for (const edge of edges) {
    dsu.union(edge[0], edge[1]);
  }

  let roots = {};
  for (const node of dsu.roots) {
    const root = dsu.find(node);
    roots[root] = true;
  }

  return Object.keys(roots).length;
};

class DSU {
  constructor(n) {
    this.roots = [];
    this.ranks = [];
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
    }
  }
}