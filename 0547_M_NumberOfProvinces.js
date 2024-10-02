// O(n^2) time complexity
// O(n) space complexity
//  where n = # cities
// Time to complete: 11:14 min
// Patterns: DSU
// Notes w.r.t. solution:

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  const dsu = new DSU(isConnected.length);

  for (let city1 = 0; city1 < isConnected.length; city1++) {
    for (let city2 = 0; city2 < isConnected[0].length; city2++) {
      if (isConnected[city1][city2] === 1) {
        dsu.union(city1, city2);
      }
    }
  }

  return dsu.getCount();
}

class DSU {
  constructor(n) {
    this.count = n;
    this.root = [];
    this.rank = [];
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }

  find(x) {
    if (this.root[x] !== x) {
      this.root[x] = this.find(this.root[x]);
    }

    return this.root[x];
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot !== parentRoot) {
      if (this.rank[childRoot] > this.rank[parentRoot]) {
        const swap = parentRoot;
        parentRoot = childRoot;
        childRoot = swap;
      }

      this.root[childRoot] = parentRoot;
      this.rank[parentRoot] += this.rank[childRoot];

      this.count--;
    }
  }

  getCount() {
    return this.count;
  }
}