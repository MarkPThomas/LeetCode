// 2025/03/17
// O(maxDay - minDay) time complexity
// O(maxDay - minDay) space complexity
// Time to complete: OT min
// Patterns: Dynamic Programming - Top-Down
// Notes w.r.t. solution: Was close, but made it too complex. Keep it simple!
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {

  function dp(day, daysLeft, dayIdx) {
    if (day > days[days.length - 1]) {
      return 0;
    }

    // Must cover all days in "days"
    // We only must purchase when at days[day] & have no more travel days
    // Must travel today if out of days
    // On days[day], we can only not buy if we still have travel days left
    if (!daysLeft && days[dayIdx] >= day) {
      // We must travel today, get next required travel day
      dayIdx++;

      // It only makes sense to buy a given ticket on a day where we are at least covered
      //  during/over the next day in days
      const daysNeeded = days[dayIdx] - day;

      // We have the 3 options
      const buy1day = daysNeeded <= 1 ? costs[0] + dp(day + 1, 0, dayIdx) : Infinity;
      const buy7day = daysNeeded <= 7 ? costs[1] + dp(day + 1, 6, dayIdx) : Infinity;
      const buy30day = daysNeeded <= 30 ? costs[2] + dp(day + 1, 29, dayIdx) : Infinity;

      return Math.min(buy1day, buy7day, buy30day);
    } else {
      // Wait
      return dp(day + 1, Math.max(0, daysLeft - 1), dayIdx);
    }
  }

  return dp(days[0], 0, 0);
};

// ===== Worked Solutions ======

// O(maxDay - minDay) time complexity
// O(maxDay - minDay) space complexity
// Patterns: Dynamic Programming - Top-down
// Notes w.r.t. solution:
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const memo = {}

  const isTravelNeeded = {};
  for (const day of days) {
    isTravelNeeded[day] = true;
  }

  function dp(day) {
    if (day > days[days.length - 1]) {
      return 0;
    }

    if (day in memo) {
      return memo[day];
    }

    if (isTravelNeeded[day]) {
      const buy1day = costs[0] + dp(day + 1);
      const buy7day = costs[1] + dp(day + 7);
      const buy30day = costs[2] + dp(day + 30);

      memo[day] = Math.min(buy1day, buy7day, buy30day);
    } else {
      memo[day] = dp(day + 1);
    }

    return memo[day];
  }

  return dp(days[0]);
};

// O(maxDay - minDay) time complexity
// O(maxDay - minDay) space complexity
// Patterns: Dynamic Programming - Bottom-Up
// Notes w.r.t. solution:
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const isTravelNeeded = {};
  for (const day of days) {
    isTravelNeeded[day] = true;
  }

  const totalOffset = days[days.length - 1] - days[0] + 1;
  const dp = Array(totalOffset + 1).fill(-1);
  dp[totalOffset] = 0;

  for (let day = days[days.length - 1]; day >= days[0]; day--) {
    const dayOffset = day - days[0];
    if (isTravelNeeded[day]) {
      const buy1day = costs[0] + (dp[dayOffset + 1] ?? 0);
      const buy7day = costs[1] + (dp[dayOffset + 7] ?? 0);
      const buy30day = costs[2] + (dp[dayOffset + 30] ?? 0);

      dp[dayOffset] = Math.min(buy1day, buy7day, buy30day);
    } else {
      dp[dayOffset] = dp[dayOffset + 1] ?? 0;
    }
  }

  return dp[0];
};