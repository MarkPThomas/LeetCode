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
 var validPath = function(n, edges, source, destination) {
  const graph = new Graph();
  graph.buildGraph(edges, n);
  return graph.hasPath(source, destination);
};

class Graph {
  constructor() {
      this.graph = {};
  }

  buildGraph(edges, numberOfEdges) {
      // Below is only OK based on definition of N & formation of graph, otherwise hashes should be based on edges noes & NOT i
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
    const sourceStack = new Stack(source);
    const destinationStack = new Stack(destination);

    while (sourceStack.toVisit.length && destinationStack.toVisit.length) {
        let currentSourceNode = sourceStack.pop();
        let currentDestinationNode = destinationStack.pop();

        if (sourceStack.visited.has(currentDestinationNode) || destinationStack.visited.has(currentSourceNode)) {
            return true;
        } else {
            this.updateToVisit(sourceStack, currentSourceNode);
            this.updateToVisit(destinationStack, currentDestinationNode);
        }
    }

    return false;
  }

  updateToVisit(stack, currentNode) {
      for (let adjacentNode of this.graph[currentNode]) {
        stack.push(adjacentNode);
      }
  }
}

class Stack {
  constructor(item) {
    this.visited = new Set();
    this.toVisit = [];
    if (item !== undefined) {
      this.toVisit.push(item);
    }
  }

  pop() {
    let nextToVisit = this.toVisit.shift(); // BFS, use pop() for DFS queue
    this.visited.add(nextToVisit);

    return nextToVisit;
  }

  push(item) {
    if (!this.visited.has(item)) {
      this.toVisit.push(item);
    }
  }
}

// Test later
// const testCases = [
// { input: '',
//   expected: ''},
// ];

// testCases.forEach((testCase) => {
//   // let result = FUT(testCase.input); // insert function name here
//   let pass = result === testCase.expected;
//   console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
//   }
// );