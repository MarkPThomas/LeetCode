// O(c * log(c) + k * log(c) + min(k, n)) -> O((k + c) * log(c)) time complexity
// O(min(c, n)) space complexity
//  where n = # costs, c = # candidates, k = min(# hiring rounds, # hired)
// Time to complete: 23:22 min (39:07 min)
// Patterns: Priority Queues - 2 PQs
// Notes w.r.t. solution:  Solved in 23:22, had a very minor bug that took to 39:07.
//  When dealing w/ 2 PQs of same sorting, define comparator to use for both, instead of defining at in-line initialization.
/**
 * @param {number[]} costs
 * @param {number} k
 * @param {number} candidates
 * @return {number}
 */
var totalCost = function (costs, k, candidates) {
  // k workers
  // costs[i] for worker i
  // candidates = first or last # of workers in costs to choose from
  // each session of k sessions (hiring 1 worker/session)
  //  choose lowest costs[i] within candidates, or lowest i if tied
  //  candidate is removed from later sessions
  // if candidates < costs.length, choose by same criteria among any costs
  const comparator = (a, b) => a[0] - b[0];

  // add first set
  let maxCand = Math.min(candidates - 1, costs.length - 1);
  const first = new PriorityQueue({ compare: comparator });
  for (let cand = 0; cand <= maxCand; cand++) {
    first.enqueue([costs[cand], cand]);
  }

  // add last set
  let minCand = Math.max(maxCand + 1, costs.length - candidates, 0);
  const last = new PriorityQueue({ compare: comparator });
  for (let cand = minCand; cand < costs.length; cand++) {
    last.enqueue([costs[cand], cand]);
  }

  let hired = [];
  for (let sess = 0; sess < k; sess++) {
    let firstCand = first.front();
    let lastCand = last.front();

    // Take first candidate if there are no second candidates, or first candidate is cheaper or equal
    if (firstCand                       // first cand
      && (!lastCand                       // no last cand
        || firstCand[0] <= lastCand[0])   // or first cand cheaper (or equal & lower idx always at first)
    ) {
      // hire from first candidate set & add next to set
      hired.push(first.dequeue());
      maxCand++;
      if (maxCand < minCand) {
        first.enqueue([costs[maxCand], maxCand]);
      }
    } else if (lastCand) {
      // hire from last candidate set & add next prior to set
      hired.push(last.dequeue());
      minCand--;
      if (minCand > maxCand) {
        last.enqueue([costs[minCand], minCand]);
      }
    }
  }

  let cost = 0;
  for (const worker of hired) {
    cost += worker[0];
  }
  return cost;
};