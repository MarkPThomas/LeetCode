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