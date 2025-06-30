// 2025/06/29
// Constructor
//  O(n) time complexity
//  O(n + s) space complexity
// Set
//  O(1) time complexity
//  O(s) space complexity
// Snap
//  O(1) time complexity
//  O(1) space complexity
// Get
//  O(log(s)) time complexity
//  O(1) space complexity
//  where n = # indices, c = # times set is called, s = # snapshots taken
// Time to complete: OT min
// Patterns: Binary Search
// Notes w.r.t. solution: Bad problem.
//  Wasn't clear about edge cases w/o trial & error.
//  Then got TLE. Only overcame through subtleties of using array over hashmap.
/**
 * @param {number} length
 */
var SnapshotArray = function (length) {
  this.snapshots = Array(length).fill().map(() => []);
  this.snaps = 0;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SnapshotArray.prototype.set = function (index, val) {
  const history = this.snapshots[index];
  if (history.length && history[history.length - 1].snapId === this.snaps) {
    history[history.length - 1].val = val;
  } else {
    this.snapshots[index].push({ val, snapId: this.snaps });
  }
};

/**
 * @return {number}
 */
SnapshotArray.prototype.snap = function () {
  this.snaps++;
  return this.snaps - 1;
};

/**
 * @param {number} index
 * @param {number} snap_id
 * @return {number}
 */
SnapshotArray.prototype.get = function (index, snap_id) {
  const history = this.snapshots[index];

  if (!history.length) {
    return 0;
  }

  let min = 0;
  let max = history.length - 1;

  if (snap_id < history[0].snapId) {
    return 0;
  } else if (history[max].snapId <= snap_id) {
    return history[max].val;
  }

  // get max floor snapId
  while (max - min > 1) {
    const mid = min + Math.floor((max - min) / 2);
    const snapId = history[mid].snapId;

    if (snapId <= snap_id) {
      min = mid;
    } else {
      max = mid;
    }
  }

  return history[max].snapId === snap_id
    ? history[max].val
    : history[min].val;
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * var obj = new SnapshotArray(length)
 * obj.set(index,val)
 * var param_2 = obj.snap()
 * var param_3 = obj.get(index,snap_id)
 */