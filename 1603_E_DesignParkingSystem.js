// 2024/09/08
// O(1) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function (big, medium, small) {
  this.garage = { 1: 0, 2: 0, 3: 0 }
  this.capacities = { 1: big, 2: medium, 3: small }
};

/**
* @param {number} carType
* @return {boolean}
*/
ParkingSystem.prototype.addCar = function (carType) {
  if (this.garage[carType] < this.capacities[carType]) {
    this.garage[carType]++;
    return true;
  }
  return false;
};

/**
* Your ParkingSystem object will be instantiated and called as such:
* var obj = new ParkingSystem(big, medium, small)
* var param_1 = obj.addCar(carType)
*/