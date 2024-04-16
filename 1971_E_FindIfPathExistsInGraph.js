// 2024/04/15
// O(m + n) time complexity
// O(m + n) space complexity
// where m = # edges, n = # nodes
// Time to complete: 16:35
// Patterns: Graph, BFS, Bi-directional BFS w/ Iteration
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  // Bidirectional BFS, preorder to avoid cycles
  const graph = {};
  edges.forEach((edge) => {
    if (!graph[edge[0]]) {
      graph[edge[0]] = [];
    }
    graph[edge[0]].push(edge[1]);


    if (!graph[edge[1]]) {
      graph[edge[1]] = [];
    }
    graph[edge[1]].push(edge[0]);
  });

  const queueStart = [source];
  const queueEnd = [destination];

  const startVisited = {};
  const endVisited = {};

  while (queueStart.length && queueEnd.length) {
    const nodeStart = queueStart.shift();
    const nodeEnd = queueEnd.shift();

    if (nodeStart === nodeEnd || startVisited[nodeEnd] || endVisited[nodeStart]) {
      return true;
    }

    startVisited[nodeStart] = true;
    endVisited[nodeEnd] = true;

    if (graph[nodeStart]) {
      graph[nodeStart].forEach((node) => {
        if (!startVisited[node]) {
          queueStart.push(node);
        }
      });
    }

    if (graph[nodeEnd]) {
      graph[nodeEnd].forEach((node) => {
        if (!endVisited[node]) {
          queueEnd.push(node);
        }
      });
    }
  }

  return false;
}


// 2023/05
// O(m + n/2) -> O(m + n) time complexity
// O(m + n) space complexity
// where m = # edges, n = # nodes
// Time to complete: 31 min, could have done faster but missed a couple of points at first
// Patterns: Graph, BFS, Bi-directional BFS
// Notes w.r.t. solution:

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  const connectivity = {};
  edges.forEach((edge) => {
    addEntry(edge[0], edge[1]);
    addEntry(edge[1], edge[0]);
  })

  function addEntry(key, value) {
    if (!connectivity[key]) {
      connectivity[key] = [];
    }
    connectivity[key].push(value);
  }


  // BFS - bidirectional
  const seenBySource = new Array(n);
  const seenByDestination = new Array(n);
  seenBySource[source] = true;
  seenByDestination[destination] = true;
  const queueSource = [source];
  const queueDestination = [destination];

  while (queueSource.length && queueDestination.length) {
    const vertexSource = queueSource.shift();
    const vertexDestination = queueDestination.shift();

    if (vertexSource === vertexDestination
      || vertexSource === destination
      || source === vertexDestination) {
      return true;
    }

    const childrenSource = connectivity[vertexSource];
    const childrenDestination = connectivity[vertexDestination];

    childrenSource?.forEach((child) => {
      if (!seenBySource[child]) {
        seenBySource[child] = true;
        queueSource.push(child);
      }
    });
    childrenDestination?.forEach((child) => {
      if (!seenByDestination[child]) {
        seenByDestination[child] = true;
        queueDestination.push(child);
      }
    });
  }
  return false;
}

// 2023/05 - Graph Class
// O() time complexity
// O(1) space complexity
// Time to complete: Over time - learning graph construction from solution. Study for later examples
// Patterns: Graph, BFS, Bi-directional BFS
// Notes w.r.t. solution: Study up again on Sets, classes, BFS vs. DFS w/ arrays & 2-way connections (e.g. visited status)

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  const graph = new Graph();
  graph.buildGraph(edges, n);
  return graph.hasPath(source, destination);
};

class Graph {
  constructor() {
    this.graph = {};
  }

  buildGraph(edges, numberOfEdges) {
    // Below is only OK based on definition of N & formation of graph, otherwise hashes should be based on edges nodes & NOT i
    for (let i = 0; i < numberOfEdges; i++) {
      this.graph[i] = [];
    }

    // Set up associations
    for (let edge of edges) {
      const [nodeI, nodeJ] = edge;

      this.graph[nodeI].push(nodeJ);
      this.graph[nodeJ].push(nodeI);
    }
  }

  // Bi-directional BFS
  hasPath(source, destination) {
    const sourceQueue = new QueueState(source);
    const destinationQueue = new QueueState(destination);

    while (sourceQueue.toVisit.length && destinationQueue.toVisit.length) {
      let currentSourceNode = sourceQueue.dequeue();
      let currentDestinationNode = destinationQueue.dequeue();

      if (sourceQueue.visited.has(currentDestinationNode) || destinationQueue.visited.has(currentSourceNode)) {
        return true;
      } else {
        this.updateToVisit(sourceQueue, currentSourceNode);
        this.updateToVisit(destinationQueue, currentDestinationNode);
      }
    }

    return false;
  }

  updateToVisit(queue, currentNode) {
    for (let adjacentNode of this.graph[currentNode]) {
      queue.enqueue(adjacentNode);
    }
  }
}

class QueueState {
  constructor(item) {
    this.visited = new Set();
    this.toVisit = [];
    if (item !== undefined) {
      this.toVisit.push(item);
    }
  }

  dequeue() {
    let nextToVisit = this.toVisit.shift(); // BFS, use pop() for DFS stack
    this.visited.add(nextToVisit);

    return nextToVisit;
  }

  enqueue(item) {
    if (!this.visited.has(item)) {
      this.toVisit.push(item);
    }
  }
}