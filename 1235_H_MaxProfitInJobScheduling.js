// 2025/06/07
// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: 1:32:04 min
// Patterns: Merge Interval, Priority Queue, Hashmap
// Notes w.r.t. solution: Mostly solved in 47:00, but JavaScript needed to be more optimal than Java solutions to avoid TLE.
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function (startTime, endTime, profit) {
  // sort by start time

  // by start time:
  // PQ sorted by end time to get next viable job
  // Return job combos & profit combos to PQ w/ updated chain end (or as-is if none are available)
  // Since more than 1 option from an ending job may be desired, place this back as-is

  // get max profit by emptying PQ


  // Build profit sequences by job starting times
  const jobs = [];
  for (let i = 0; i < startTime.length; i++) {
    const job = { start: startTime[i], end: endTime[i], profit: profit[i] };
    jobs.push(job);
  }
  jobs.sort((a, b) => b.start - a.start);

  const jobEnds = new PriorityQueue((a, b) => a - b);
  const profitsAt = {};

  let maxProfitPrev = 0;
  let maxProfit = 0;
  while (jobs.length) {
    const job = jobs.pop();

    // Remove all sequences that end before curr job
    //  Details don't matter, just governing starting profit
    // OK, as next job will always start later
    while (jobEnds.size() && jobEnds.front() <= job.start) {
      const prevJobEnd = jobEnds.dequeue();
      maxProfitPrev = Math.max(maxProfitPrev, profitsAt[prevJobEnd]);
      delete profitsAt[prevJobEnd];
    }

    // Add job profit to most profitable of all sequences that have ended
    const updatedProfit = maxProfitPrev + job.profit;

    // Add if end not in heap, else update profit in-place if governing
    if (profitsAt[job.end]) {
      profitsAt[job.end] = Math.max(profitsAt[job.end], updatedProfit);
    } else {
      profitsAt[job.end] = updatedProfit;
      jobEnds.enqueue(job.end);
    }

    maxProfit = Math.max(maxProfit, profitsAt[job.end]);
  }

  return maxProfit;
};