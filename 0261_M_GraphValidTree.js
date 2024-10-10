// 2024/10/10
// O(n + e) -> O(n) time complexity
// O(n + e) -> O(n) space complexity
//  where n = # nodes
//    e = # edges
//    edges.length check bounds e = n - 1 => O(n + n) = O(n)
// Time to complete: 5:58 min
// Patterns: Graph - DFS iterative
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  if (edges.length !== n - 1) {
    return false;
  }

  const connectivity = {};
  const visited = {};
  for (let i = 0; i < n; i++) {
    connectivity[i] = [];
    visited[i] = false;
  }
  for (const edge of edges) {
    connectivity[edge[0]].push(edge[1]);
    connectivity[edge[1]].push(edge[0]);
  }

  let count = 0;
  const stack = [0];
  while (stack.length) {
    const node = stack.pop();
    if (visited[node]) {
      continue;
    }
    visited[node] = true;
    count++;

    for (const neighbor of connectivity[node]) {
      stack.push(neighbor);
    }
  }

  return count === n;
};

// 2024/10/10
// O(n) time complexity
// O(n) space complexity
//  where n = # nodes
//    e = # edges
//    edges.length check bounds e = n - 1 => O(n + n) = O(n)
// Time to complete: 8:06 min
// Patterns: DSU
// Notes w.r.t. solution: Final check of common root is redundant. Could have been left out.
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  // valid tree if no cycles & all nodes have same ultimate root
  if (edges.length !== n - 1) {
    return false;
  }

  const dsu = new DSU(n);
  for (const edge of edges) {
    if (!dsu.union(edge[0], edge[1])) {
      return false;
    }
  }

  const root = dsu.find(0);
  for (let i = 1; i < n; i++) {
    if (dsu.find(i) !== root) {
      return false;
    }
  }

  return true;
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

    if (childRoot === parentRoot) {
      return false;
    }

    if (this.ranks[childRoot] > this.ranks[parentRoot]) {
      const swap = childRoot;
      childRoot = parentRoot;
      parentRoot = swap;
    }

    this.roots[childRoot] = parentRoot;
    this.ranks[parentRoot] += this.ranks[childRoot];

    return true;
  }
}


// 2024/10/03
// O(n) time complexity
// O(n) space complexity
//  where n = # nodes
// Time to complete: Not timed
// Patterns: DFS
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  // Ensure no cycles
  if (edges.length !== n - 1) {
    return false;
  }

  const connectivity = {};
  for (let i = 0; i < n; i++) {
    connectivity[i] = [];
  }

  for (const edge of edges) {
    connectivity[edge[0]].push(edge[1]);
    connectivity[edge[1]].push(edge[0]);
  }

  // Ensure all nodes can be reached
  const visited = { 0: true };
  const stack = [0];
  let count = 1;
  while (stack.length) {
    const node = stack.pop();

    for (const child of connectivity[node]) {
      if (visited[child]) {
        continue;
      }
      visited[child] = true;
      stack.push(child);
      count++;
    }
  }

  return count === n;
};

// 2024/10/03
// O() time complexity
// O(1) space complexity
// Time to complete: Not timed
// Patterns: DSU
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  if (edges.length !== n - 1) {
    return false;
  }

  // create DSU & merge edges
  const dsu = new DSU(n);
  for (const edge of edges) {
    if (!dsu.union(edge[0], edge[1])) {
      return false;
    }
  }

  return true;
};

class DSU {
  constructor(n) {
    this.root = [];
    this.rank = [];
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }

  find(x) {
    if (x !== this.root[x]) {
      this.root[x] = this.find(this.root[x]);
    }

    return this.root[x];
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot === parentRoot) {
      return false;
    }

    if (this.rank[childRoot] > this.rank[parentRoot]) {
      const swap = childRoot;
      childRoot = parentRoot;
      parentRoot = swap;
    }

    this.root[childRoot] = parentRoot;
    this.rank[parentRoot] += this.rank[childRoot];

    return true;
  }
}