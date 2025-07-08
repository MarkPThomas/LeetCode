// 2025/07/07
// O(n * log(k)) time complexity
// O(1) space complexity
//  where n = # distances, k = max - min
// Time to complete: 25:06 min
// Patterns: Binary Search
// Notes w.r.t. solution:
/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {
  // ceil train times
  // trains travel at same speed & are taken sequentially, in order
  // determine min train speed or -1
  function getTime(speed) {
    let time = 0;

    for (let i = 0; i < dist.length; i++) {
      const distTrain = dist[i];
      const timeOnTrain = distTrain / speed; // dist / (dist/time) = time
      if (i < dist.length - 1) {
        time += Math.ceil(timeOnTrain)
      } else {
        time += timeOnTrain;
      }
    }

    return time;
  }

  let min = 1;
  if (getTime(min) <= hour) {
    return min;
  }

  let maxDistance = 0;
  for (const distCurr of dist) {
    maxDistance = Math.max(maxDistance, distCurr);
  }
  const distLast = dist[dist.length - 1];
  const maxSpeedByLast = hour - dist.length + 1 <= 0
    ? 0
    : Math.ceil(distLast / (hour - dist.length + 1));

  let max = Math.max(maxDistance, maxSpeedByLast);
  if (max < min || hour < dist.length - 1 + distLast / max) {
    return -1;
  }

  while (max - min > 1) {
    const mid = min + Math.floor((max - min) / 2);
    const time = getTime(mid);

    if (time <= hour) { // slow down
      max = mid;
    } else { // speed up
      min = mid;
    }
  }

  return max;
};