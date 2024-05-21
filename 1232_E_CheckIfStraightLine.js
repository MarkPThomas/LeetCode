// 2024/05/21
// O(n) time complexity
// O(1) space complexity
// Time to complete: 9:59 min
// Patterns: Math
// Notes w.r.t. solution:

/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function (coordinates) {
  function getSlope(coordI, coordJ) {
    let run = (coordJ[0] - coordI[0]);
    if (!run) {
      return Infinity;
    }

    let rise = (coordJ[1] - coordI[1]);
    if (!rise) {
      return 0;
    }

    return rise / run;
  }

  // if slope between all pt is constant, line is straight;
  let firstSlope = getSlope(coordinates[0], coordinates[1]);

  for (let i = 1; i < coordinates.length - 1; i++) {

    let currSlope = getSlope(coordinates[i], coordinates[i + 1]);

    if (currSlope !== firstSlope) {
      return false;
    }
  }

  return true;
};