// 2024/10/29
// O(m + n) time complexity
// O(n) space complexity
// Time to complete: NA
// Patterns: DSU w/ weighted edges
// Notes w.r.t. solution: Example DSU Solution
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // equations[i] = [Ai, Bi]
  // values[i] = Ai / Bi
  // queries[j] = [Cj, Dj]
  // Find answer for Cj / Dj
  //  i.e. queries[j] = values[i]

  const nodes = new Set();
  for (const [dividend, divisor] of equations) {
    nodes.add(dividend);
    nodes.add(divisor);
  }

  const dsu = new DSU(nodes);

  for (let i = 0; i < equations.length; i++) {
    const [dividend, divisor] = equations[i];
    const quotient = values[i];

    dsu.union(dividend, divisor, quotient);
  }

  const results = [];
  for (const query of queries) {
    const [dividend, divisor] = query;
    results.push(dsu.evaluate(dividend, divisor));
  }

  return results;
};

class DSU {
  constructor(nodes) {
    this.nodeToNumber = {};
    let idx = 0;
    for (const node of nodes) {
      this.nodeToNumber[node] = idx;
      idx++;
    }

    this.roots = [];
    this.ranks = [];
    this.coefs = [];

    for (let i = 0; i < nodes.size; i++) {
      this.roots[i] = i;
      this.ranks[i] = 1;
      this.coefs[i] = 1;
    }
  }

  find(x) {
    if (this.roots[x] !== x) {
      const [newX, coef] = this.find(this.roots[x]);
      this.roots[x] = newX;
      this.coefs[x] *= coef;

      return [this.roots[x], this.coefs[x]];
    }

    return [x, this.coefs[x]];
  }

  union(child, parent, value) {
    const childNum = this.nodeToNumber[child];
    const parentNum = this.nodeToNumber[parent];

    let [childRoot, childCoeff] = this.find(childNum);
    let [parentRoot, parentCoeff] = this.find(parentNum);

    if (childRoot !== parentRoot) {
      if (this.ranks[childRoot] > this.ranks[parentRoot]) {
        const swapRoot = childRoot;
        childRoot = parentRoot;
        parentRoot = swapRoot;

        const swapCoeff = childCoeff;
        childCoeff = parentCoeff;
        parentCoeff = swapCoeff;

        value = 1 / value;
      }

      this.roots[childRoot] = parentRoot;
      this.coefs[childRoot] = value * (parentCoeff / childCoeff);
      this.ranks[parentRoot] += this.ranks[childRoot];
    }
  }

  evaluate(child, parent) {
    const childNum = this.nodeToNumber[child];
    const parentNum = this.nodeToNumber[parent];
    if (childNum === undefined || parentNum === undefined) {
      return -1;
    }
    if (childNum === parentNum) {
      return 1;
    }

    let [childRoot, childCoeff] = this.find(childNum);
    let [parentRoot, parentCoeff] = this.find(parentNum);
    if (childRoot !== parentRoot) {
      return -1;
    }

    return childCoeff / parentCoeff;
  }
}

// 2024/10/29
// O(m * n) time complexity
// O(n) space complexity
// Time to complete: NA
// Patterns: DFS w/ weighted edges
// Notes w.r.t. solution: Example DFS Solution
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // equations[i] = [Ai, Bi]
  // values[i] = Ai / Bi
  // queries[j] = [Cj, Dj]
  // Find answer for Cj / Dj
  //  i.e. queries[j] = values[i]

  const graph = {};
  for (let i = 0; i < equations.length; i++) {
    const [dividend, divisor] = equations[i];
    if (!graph[dividend]) {
      graph[dividend] = {};
    }
    if (!graph[divisor]) {
      graph[divisor] = {};
    }

    const quotient = values[i];

    graph[dividend][divisor] = quotient;
    graph[divisor][dividend] = 1 / quotient;
  }

  const results = [];
  for (const query of queries) {
    const [dividend, divisor] = query;
    if (!graph[dividend] || !graph[divisor]) {
      results.push(-1);
    } else if (dividend === divisor) {
      results.push(1);
    } else {
      const visited = {};
      const result = backtrackEvaluate(graph, dividend, divisor, 1, visited);
      results.push(result);
    }
  }

  return results;
};

function backtrackEvaluate(graph, currNode, targetNode, accProduct, visited) {
  visited[currNode] = true;
  let result = -1;

  const neighbors = graph[currNode];
  if (neighbors[targetNode]) {
    result = accProduct * neighbors[targetNode];
  } else {
    for (const [nextNode, value] of Object.entries(neighbors)) {
      if (visited[nextNode]) {
        continue;
      }

      result = backtrackEvaluate(graph, nextNode, targetNode, accProduct * value, visited);
      if (result !== -1) {
        break;
      }
    }
  }

  delete visited[currNode];

  return result;
}

// 2024/10/29
// O() time complexity
// O(1) space complexity
// Time to complete: Timeout - 27:29
// Patterns:
// Notes w.r.t. solution: I was on the right track, just wasn't sure whether to proceed with backtracking, or how to log the DFS path & acculumate results.
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // equations[i] = [Ai, Bi]
  // values[i] = Ai / Bi
  // queries[j] = [Cj, Dj]
  // Find answer for Cj / Dj
  //  i.e. queries[j] = values[i]

  const graph = {};
  for (let i = 0; i < equations.length; i++) {
    if (!graph[equations[i][0]]) {
      graph[equations[i]][0] = [];
    }
    if (!graph[equations[i][1]]) {
      graph[equations[i]][1] = [];
    }

    graph[equations[i][0]].push([equations[i][1], values[i]]);
    graph[equations[i][1]].push([equations[i][0], 1 / values[i]]);
  }

  const results = [];
  for (const query of queries) {
    if (!graph[query[0]] || !graph[query[1]]) {
      results.push(-1);
    } else if (graph[query[0]] === graph[query[1]]) {
      results.push(1);
    } else {
      // dfs
      let result = 1;
      const path = [];
      const stack = [graph[query[0]]];
      while (stack.length) {
        const nextEqs = stack.pop();
        path.push(nextEqs[0]);
        if (nextEqs[0] === query[1]) {
          break;
        }

        for (const nextEq of nextEqs) {
          stack.push(nextEq);
        }
      }

      if (path.length) {
        for (const step of path) {

        }
        results.push(result);
      } else {
        results.push(-1);
      }
    }
  }

  return results;
};