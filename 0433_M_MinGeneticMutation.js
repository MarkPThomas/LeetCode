// O(n * c^2) time complexity
// O(n * c) space complexity
//  where n = # genes, c = # chars
// Time to complete: 17:18 min
// Patterns: Graph BFS
// Notes w.r.t. solution:
/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (startGene, endGene, bank) {
  // validate endGene is in bank
  if (bank.indexOf(endGene) === -1) {
    return -1;
  }

  // each gene can be representat as hash of A, C, G, T freqs
  // can also note # of mutations different from startGene
  //      order bankGenes by # mutations

  // BFS or DFS of bank
  // one gene mutation at a time?
  function getNextMutations(prevGene, nextMutations) {
    for (const gene of bank) {
      if (gene in pastMutations) {
        continue;
      }

      if (getNumMutations(prevGene, gene) === 1) {
        nextMutations.push(gene);
      }
    }
  }

  function getNumMutations(gene1, gene2) {
    let diffCount = 0;
    for (let i = 0; i < gene1.length; i++) {
      if (gene1[i] !== gene2[i]) {
        diffCount++;
      }
    }
    return diffCount;
  }

  const pastMutations = {};
  pastMutations[startGene] = true;

  let lastMutation = [];
  getNextMutations(startGene, lastMutation); // T: n * g

  let numMutations = 0;
  while (lastMutation.length) {
    numMutations++;

    const nextMutation = [];
    for (let i = 0; i < lastMutation.length; i++) {
      const gene = lastMutation[i];
      pastMutations[gene] = true;

      if (gene === endGene) {
        return numMutations;
      }

      getNextMutations(gene, nextMutation);
    }
    lastMutation = nextMutation;
  }

  return -1;
};