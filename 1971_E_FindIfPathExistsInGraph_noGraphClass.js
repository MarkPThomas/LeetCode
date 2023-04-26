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