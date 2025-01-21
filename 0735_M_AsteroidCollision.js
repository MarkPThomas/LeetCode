// O(n) time complexity
// O(n) space complexity
// Time to complete: 32:56 min
// Patterns: Stack
// Notes w.r.t. solution: Mostly lost time handling edge cases.
//    Slow down & work out logic carefully!
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  const remaining = [];

  function hasCollision(prev, next) {
    return (prev > 0 && next < 0);
  }

  for (const asteroid of asteroids) {
    let prevAsteroid = remaining[remaining.length - 1] ?? 0;
    if (!remaining.length || !(hasCollision(prevAsteroid, asteroid))) {
      remaining.push(asteroid);
    } else { // Collision
      let nextSize = Math.abs(asteroid);
      let prevSize = Math.abs(prevAsteroid);

      while (remaining.length && prevSize                                     // prev asteroids remain
        && hasCollision(prevAsteroid, asteroid) && prevSize <= nextSize) {  // collisions continue

        // prev asteroid is always destroyed
        remaining.pop();

        if (prevSize === nextSize) { // both destroyed, collisions stop early
          prevSize = 0;
          nextSize = 0;
        } else { // check next prior asteroid
          prevAsteroid = remaining[remaining.length - 1] ?? 0;
          prevSize = Math.abs(prevAsteroid);
        }
      }

      // Add next if not destroyed by what stopped the collision
      if (nextSize && !(hasCollision(prevAsteroid, asteroid) && prevSize > nextSize)) {
        remaining.push(asteroid);
      }
    }
  }

  return remaining;
};

// 2025/01/21
// O(n) time complexity
// O(1) space complexity
// Time to complete: 39:46 min
// Patterns: 2 Pointers
// Notes w.r.t. solution: 10:30 min after switching from arrays to 2 Pointer strategy
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  let max = asteroids.length - 1;
  // repeat until no more collision paths exist
  let hasCollision = true;
  while (hasCollision && max > 0) {
    // find pairs of collision paths, check collisions
    hasCollision = false;
    let prev = 0;
    let next = 1;
    while (next <= max) {
      // collision path is when a pair of asteroids is + then - sign
      if (asteroids[prev] > 0 && asteroids[next] < 0) {
        hasCollision = true;
        if (Math.abs(asteroids[prev]) > Math.abs(asteroids[next])) {
          // next asteroid destroyed by skipping to next
          next++;
        } else if (Math.abs(asteroids[next]) > Math.abs(asteroids[prev])) {
          // prev asteroid destroyed by copying next over prev
          asteroids[prev] = asteroids[next]
          next++;
        } else {
          // both asteroids destroyed by rewinding prev
          prev--;
          next++;
        }
      } else {
        // move to next pair
        prev++;
        // if pairs are not adjacent, copy next asteroid to be adjacent
        asteroids[prev] = asteroids[next];
        next++;
      }
    }

    max = prev;
  }

  return asteroids.slice(0, max + 1);
};