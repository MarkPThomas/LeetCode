// 2025/07/03
// Constructor
//  O(1) time complexity
//  O(1) space complexity
// addScore
//  O(1) time complexity
//  O(n) space complexity
// top
//  O(n * log(k)) time complexity
//  O(k) space complexity
// reset
//  O(1) time complexity
//  O(1) space complexity
// where n = # players
// Time to complete: 6:44 min
// Patterns:
// Notes w.r.t. solution:

var Leaderboard = function () {
  this.players = {};
};

/**
 * @param {number} playerId
 * @param {number} score
 * @return {void}
 */
Leaderboard.prototype.addScore = function (playerId, score) {
  this.players[playerId] ??= 0;
  this.players[playerId] += score;
};

/**
 * @param {number} K
 * @return {number}
 */
Leaderboard.prototype.top = function (K) {
  // sort by scores? return first k?
  const topK = new PriorityQueue((a, b) => a - b);

  for (const score of Object.values(this.players)) {
    topK.enqueue(score);
    while (topK.size() > K) {
      topK.dequeue();
    }
  }

  let scoreSum = 0;
  while (topK.size()) {
    scoreSum += topK.dequeue();
  }

  return scoreSum;
};

/**
 * @param {number} playerId
 * @return {void}
 */
Leaderboard.prototype.reset = function (playerId) {
  this.players[playerId] = 0;
};

/**
 * Your Leaderboard object will be instantiated and called as such:
 * var obj = new Leaderboard()
 * obj.addScore(playerId,score)
 * var param_2 = obj.top(K)
 * obj.reset(playerId)
 */