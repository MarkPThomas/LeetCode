// 2024/12/09
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 13:00 min
// Patterns: Greedy, Priority Heap
// Notes w.r.t. solution:
/**
 * @param {number[]} sticks
 * @return {number}
 */
var connectSticks = function (sticks) {
  let joinedSticks = new PriorityQueue({ compare: (a, b) => a - b });
  for (const stick of sticks) {
    joinedSticks.enqueue(stick);
  }

  let totalCost = 0;
  while (joinedSticks.size() > 1) {
    let sum = joinedSticks.dequeue();
    sum += joinedSticks.dequeue();
    totalCost += sum;

    joinedSticks.enqueue(sum);
  }

  return totalCost;
};