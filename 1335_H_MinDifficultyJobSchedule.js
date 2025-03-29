// 2025/03/19
// O(n^2 * d) time complexity
// O(n * d) space complexity
// Time to complete: 53:44 min
// Patterns: Dynamic Programming - Top-Down
// Notes w.r.t. solution: Mostly solved in 25:44, got hint at 42:20.
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  // at least one job must be done each day
  if (jobDifficulty.length < d) {
    return -1;
  }

  // States:
  //  Day
  //  1st job, last job
  // Stores min difficulty
  const memo = Array(d + 1).fill().map(() => Array(jobDifficulty.length).fill(Infinity));

  let maxDifficulty = -Infinity;
  const maxRemainingDifficulty = [];
  for (let i = jobDifficulty.length - 1; i >= d - 1; i--) {
    maxDifficulty = Math.max(maxDifficulty, jobDifficulty[i]);
    maxRemainingDifficulty[i - d + 1] = maxDifficulty;
  }

  function dp(day, nextJobIdx) {
    if (day === d) {
      // Return hardest remaining on last day
      return maxRemainingDifficulty[nextJobIdx - day + 1];
    }

    if (memo[day][nextJobIdx] !== Infinity) {
      return memo[day][nextJobIdx];
    }

    let dayMaxDifficulty = -Infinity;
    let scheduleMinDifficulty = Infinity;
    // jobs can only be done in order listed in jobDifficulty
    //  Min is idx + 1 in order to do one today
    //  max is < jobDifficulty.length - idx in order to leave at least one job for each remaining day
    for (let i = nextJobIdx; i < jobDifficulty.length - (d - day); i++) {
      // dayDifficulty = max jobDifficulty of the day of all jobs done
      dayMaxDifficulty = Math.max(dayMaxDifficulty, jobDifficulty[i]);

      // Next job idx passed related to how many jobs done today
      // scheduleDifficulty = sum of all dayDifficulty for all days
      scheduleMinDifficulty = Math.min(
        scheduleMinDifficulty,
        dayMaxDifficulty + dp(day + 1, i + 1)
      );
    }

    memo[day][nextJobIdx] = scheduleMinDifficulty;
    return scheduleMinDifficulty;
  }

  return dp(1, 0);
};

// ===== Solutions =====
// O(n * d) time complexity
// O(n) space complexity
// Time to complete: 53:44 min
// Patterns: Dynamic Programming - Bottom-Up w/ State Reduction & Monotonic Stack
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
  const n = jobDifficulty.length;

  // at least one job must be done each day
  if (n < d) {
    return -1;
  }

  let minAccDiffPrevDay = Array(n).fill(Infinity);
  for (let day = 0; day < d; day++) {
    const availableJobs = [];

    const minAccDiffCurrDay = Array(n);
    for (let currJob = day; currJob < n - (d - day - 1); currJob++) {
      // Start w/ job for the day (1 required) + any prev day difficulties
      minAccDiffCurrDay[currJob] =
        jobDifficulty[currJob]
        + (currJob > 0 ? minAccDiffPrevDay[currJob - 1] : 0);

      // If current job difficulty >= last job difficulty
      //  remove prior jobs available for the day of lesser difficulty
      //  while updating result
      let lastAvailableJob = availableJobs.length - 1;
      while (availableJobs.length
        && jobDifficulty[availableJobs[lastAvailableJob]] <= jobDifficulty[currJob]) {

        const prevJob = availableJobs.pop();
        lastAvailableJob--;
        const deltaDifficulty = jobDifficulty[currJob] - jobDifficulty[prevJob];

        minAccDiffCurrDay[currJob] = Math.min(
          minAccDiffCurrDay[currJob],
          minAccDiffCurrDay[prevJob] + deltaDifficulty
        );
      }

      // Check against last available job for the day, if any remain
      // i.e. current job difficulty < last job difficulty
      // Similar to prior check except job is NOT removed from stack & no delta
      if (availableJobs.length) {
        lastAvailableJob = availableJobs.length - 1;

        minAccDiffCurrDay[currJob] = Math.min(
          minAccDiffCurrDay[currJob],
          minAccDiffCurrDay[availableJobs[lastAvailableJob]]
        );
      }

      // Add job for later consideration against later available jobs
      availableJobs.push(currJob);

      // No need to calculate i > 0 on last day
      if (day === d) {
        break;
      }
    }

    minAccDiffPrevDay = minAccDiffCurrDay;
  }

  return minAccDiffPrevDay[n - 1];
};