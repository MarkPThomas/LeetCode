// 2025/03/31
// O(n^2) time complexity
// O(1) space complexity
// Time to complete: 16:46 min
// Patterns: Brute Force
// Notes w.r.t. solution: Passes, but is slow
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  // see if there is ever enough gas
  let totalGas = 0;
  let totalCost = 0;
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
  }

  if (totalGas < totalCost) {
    return -1;
  }


  for (let i = 0; i < gas.length; i++) {
    // Starting fuel
    let fuel = gas[i];

    // check if starting station is valid
    let station = i;
    do {
      // burn fuel getting to next station
      fuel -= cost[station];
      if (fuel < 0) {
        break;
      }
      station = (station + 1) % gas.length;

      // check if circle complete
      if (station === i) {
        return i;
      }

      // refuel gas at next station & continue
      fuel += gas[station];
    } while (fuel)
  }

  return -1;
};

// ===== Solutions ====
// O(n^2) time complexity
// O(1) space complexity
// Patterns: Brute Force
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
  }

  if (totalGas < totalCost) {
    return -1;
  }


  for (let i = 0; i < gas.length; i++) {
    let fuel = gas[i];
    let station = i;
    do {
      fuel -= cost[station];
      if (fuel < 0) {
        break;
      }

      station = (station + 1) % gas.length;
      if (station === i) {
        return i;
      }

      fuel += gas[station];
    } while (fuel)
  }

  return -1;
};


// O(n) time complexity
// O(1) space complexity
// Patterns: Kadane's (refactored from brute force)
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let totalGas = 0;
  let totalCost = 0;
  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
  }

  if (totalGas < totalCost) { // No solution possible
    return -1;
  }

  let start = 0
  let fuel = 0
  for (let end = 0; end < gas.length; end++) {
    fuel += gas[end] - cost[end];
    if (fuel < 0) { // Reset start & accumulated net fuel
      fuel = 0;
      start = end + 1;
    }
  }

  // By problem definition, only 1 station is possible,
  //  so after ruling out possibility earlier, any solution is valid
  return start;
};

// O(n) time complexity
// O(1) space complexity
// Patterns: Sliding Window
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const numStops = gas.length;
  let fuel = 0;
  let start = 0;
  let end = start;
  while (start < numStops) {
    const netGasForward = gas[end % numStops] - cost[end % numStops];
    if (fuel + netGasForward >= 0) { // Valid move forward
      if (end - start + 1 === numStops) { // We are done
        return start;
      }
      // Move forward
      fuel += netGasForward;
      end++;
    } else { // Invalid move forward
      if (start < end) { // Subtract out prev movement
        fuel -= (gas[start] - cost[start]);
      } else { // No prev movement to subtract, increment end forward by 1
        end++;
      }

      // Increment starting station forward by 1
      start++;
    }
  }

  return -1;
};