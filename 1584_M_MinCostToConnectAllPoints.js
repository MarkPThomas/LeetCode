// 2024/10/09
// O(n^2) time complexity
// O(n) space complexity
// Time to complete: 10:49 min
// Patterns: Graph, Prim's Algorithm + Kruskal's Algorithm
// Notes w.r.t. solution: My variation of a presented solution
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const visited = [];
  let visitedCount = 0;

  const minDist = Array(points.length).fill(Infinity);
  minDist[0] = 0;  // Dist to starting point is 0

  let distance = 0;

  while (visitedCount < points.length) {
    let currMinDist = Infinity;
    let currPoint = -1;

    // Get point not yet visited closest to any visited point
    for (let i = 0; i < points.length; i++) {
      if (!visited[i] && currMinDist > minDist[i]) {
        currMinDist = minDist[i];
        currPoint = i;
      }
    }

    visited[currPoint] = true;
    visitedCount++;

    distance += currMinDist;

    // Update unvisited points
    for (let j = 0; j < points.length; j++) {
      if (!visited[j]) {
        const pointI = points[currPoint];
        const pointJ = points[j];

        // Calc distance & update if less than current
        const dist = Math.abs(pointI[0] - pointJ[0]) + Math.abs(pointI[1] - pointJ[1]);
        if (dist < minDist[j]) {
          minDist[j] = dist;
        }
      }
    }
  }

  return distance;
};

// 2024/10/09
// O() time complexity
// O() space complexity
// Time to complete: 18:54 min, TLE @ 71/72 :-P
// Patterns: Graph, Prim's Algorithm
// Notes w.r.t. solution: Only can run w/o TLE by using min heap :-P
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  function getDist(i, j) {
    return Math.abs(i[0] - j[0]) + Math.abs(i[1] - j[1]);
  }

  function addAllEdgesFromPoint(i, edges, visited, points) {
    for (let j = 0; j < points.length; j++) {
      if (!visited[j]) {
        const dist = getDist(points[i], points[j]);
        const edge = new Edge(i, j, dist)
        edges.push(edge);
      }
    }
  }

  function setMinEdge(edges) {
    let minDist = Infinity;
    let minEdge = null;
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.dist < minDist) {
        minDist = edge.dist;
        minEdge = i;
      }
    }

    const swap = edges[edges.length - 1];
    edges[edges.length - 1] = edges[minEdge];
    edges[minEdge] = swap;
  }

  // Assemble edges from first node & get min
  const visited = []
  visited[0] = true;
  let visitedCount = 1;

  const edges = [];
  addAllEdgesFromPoint(0, edges, visited, points);

  let distance = 0;

  while (edges.length && visitedCount < points.length) {
    setMinEdge(edges);
    const edge = edges.pop();

    if (visited[edge.j]) {
      continue;
    }
    visited[edge.j] = true;

    distance += edge.dist;

    addAllEdgesFromPoint(edge.j, edges, visited, points);

    visitedCount++;
  }

  return distance;
};

class Edge {
  constructor(i, j, dist) {
    this.i = i;
    this.j = j;
    this.dist = dist;
  }
}

// 2024/10/09
// O() time complexity
// O() space complexity
// Time to complete: 16:27 min, TLE @ 65/72 :-P
// Patterns: Graph, Prim's Algorithm
// Notes w.r.t. solution:
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  let totalMinDist = 0;

  const notVisited = {};
  for (const point of points) {
    notVisited[point] = point;
  }

  // Choose first point to start
  const visited = {};
  visited[points[0]] = points[0];
  delete notVisited[points[0]];

  let numVisited = 1;
  while (numVisited < points.length) {
    // Get min distance from any point in the MST set to any point not yet in the set
    let minDist = Infinity;
    let minPoint = null;

    // Check edges for all nodes in MST set
    for (const point of Object.values(visited)) {
      // to all nodes outside the MST set
      for (const neighbor of Object.values(notVisited)) {

        const dist = Math.abs(neighbor[0] - point[0]) + Math.abs(neighbor[1] - point[1]);
        if (dist < minDist) {
          minDist = dist;
          minPoint = neighbor;
        }
      }
    }

    totalMinDist += minDist;

    visited[minPoint] = minPoint;
    delete notVisited[minPoint];

    numVisited++;
  }

  return totalMinDist;
};


// 2024/10/09
// O(n^2 * log(n^2)) time complexity
// O(n^2) space complexity
// Time to complete: 14:45 min
// Patterns: Graph, Kruskal's Algorithm
// Notes w.r.t. solution: Would have gone OT due to finding/resolving bug in the DSU find method. Careful!
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  // Assemble edges & sort by weight
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const pointI = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const pointJ = points[j];
      const dist = Math.abs(pointI[0] - pointJ[0]) + Math.abs(pointI[1] - pointJ[1]);

      const edge = new Edge(i, j, dist);
      edges.push(edge);
    }
  }
  edges.sort((a, b) => a.dist - b.dist);

  let distance = 0;

  // For each edge, add it to MST unless it is a cycle
  let edgesProcessed = 0;
  const dsu = new DSU(points.length);
  for (const edge of edges) {
    if (dsu.union(edge.i, edge.j)) {
      distance += edge.dist;

      edgesProcessed++;
      if (edgesProcessed === points.length - 1) {
        break;
      }
    }
  }

  return distance;
};

class Edge {
  constructor(i, j, dist) {
    this.i = i;
    this.j = j;
    this.dist = dist;
  }
}

class DSU {
  constructor(size) {
    this.roots = [];
    this.ranks = [];

    for (let i = 0; i < size; i++) {
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