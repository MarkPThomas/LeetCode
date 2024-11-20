// 2024/11/19
// Instantiation:
//  O(1) time complexity
//  O(r + s^2)->O(10^6 + 10^2)->O(1) space complexity
// checkIn:
//  O(1) time complexity
//  O(1) space complexity
// checkOut:
//  O(1) time complexity
//  O(1) space complexity
// getAverageTime:
//  O(1) time complexity
//  O(1) space complexity
//  where r = # active riders (max 10^6)
//    s = # stations (max 10)
// Time to complete: 17:19 min
// Patterns: Hashmap, Graph
// Notes w.r.t. solution:

var UndergroundSystem = function () {
  this.activeRiders = {} // id = [stationStart, Start]
  this.stationRoutes = {};  // startStation = {[endStation, sum, count],...}
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  if (!this.activeRiders[id]) {
    this.activeRiders[id] = [stationName, t];
  }

  if (!this.stationRoutes[stationName]) {
    this.stationRoutes[stationName] = {}
  }
};

/**
 * @param {number} id
 * @param {string} stationName
 * @param {number} t
 * @return {void}
 */
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  const [stationStart, timeStart] = this.activeRiders[id];
  const duration = t - timeStart;

  delete this.activeRiders[id];

  if (!this.stationRoutes[stationStart][stationName]) {
    this.stationRoutes[stationStart][stationName] = [duration, 1];
  } else {
    let [sum, count] = this.stationRoutes[stationStart][stationName];
    sum += duration;
    count++;

    this.stationRoutes[stationStart][stationName] = [sum, count];
  }
};

/**
 * @param {string} startStation
 * @param {string} endStation
 * @return {number}
 */
UndergroundSystem.prototype.getAverageTime = function (startStation, endStation) {
  const [sum, count] = this.stationRoutes[startStation][endStation];

  return count ? sum / count : -1;
};

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * var obj = new UndergroundSystem()
 * obj.checkIn(id,stationName,t)
 * obj.checkOut(id,stationName,t)
 * var param_3 = obj.getAverageTime(startStation,endStation)
 */