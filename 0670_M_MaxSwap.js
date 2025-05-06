// 2025/05/06
// O(n) time complexity
// O(n) space complexity
//  where n = # digit places
// Time to complete: 1:00:52 min (OT)
// Patterns: Greedy, Monotonic Stack
// Notes w.r.t. solution: Is much easier/simpler by going right-to-left, then left-to-right
/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
  const numDigits = num.toString().split('');
  for (let i = 0; i < numDigits.length; i++) {
    numDigits[i] = Number(numDigits[i]);
  }

  // Get largest digit & position after smallest digit
  // Get smallest valley digit & position
  let largest = numDigits[0];
  let largestIdx = 0;
  let smallest = numDigits[0];
  let smallestIdx = 0;

  for (let i = 1; i < numDigits.length; i++) {
    const numCurr = numDigits[i];

    // Earliest min before a negative slope. Stop at next first positive slope
    if (numCurr < smallest && (largestIdx === 0 || numDigits[i - 1] === numDigits[largestIdx])) {
      smallest = numCurr;
      smallestIdx = i;

      if (i < numDigits.length - 1 && numDigits[i + 1] >= numCurr) {  // Reset max
        largest = numCurr;
        largestIdx = i;
      }
    }

    // Latest max after earliest min
    if (numCurr >= largest) {
      largest = numCurr;
      largestIdx = i;
    }
  }

  // Find insert position for max after min
  let idx = 0;
  while (numDigits[idx] >= largest) {
    idx++;
  }

  if (idx < largestIdx) {
    const swap = numDigits[idx];
    numDigits[idx] = numDigits[largestIdx];
    numDigits[largestIdx] = swap;
  }

  return Number(numDigits.join(''));
};