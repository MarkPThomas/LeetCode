// 2024/08/23
// O(1) time complexity
// O(n) space complexity
// where n = # of unique messages
// Time to complete: 5:51 min
// Patterns: Hashmap
// Notes w.r.t. solution:

var Logger = function () {
  this.messages = {};
  this.delay = 10;
};

/**
* @param {number} timestamp
* @param {string} message
* @return {boolean}
*/
Logger.prototype.shouldPrintMessage = function (timestamp, message) {
  if (!this.messages.hasOwnProperty(message)) {
    this.messages[message] = timestamp;
    return true;
  } else {
    if (this.messages[message] + this.delay <= timestamp) {
      this.messages[message] = timestamp;
      return true
    } else {
      return false;
    }
  }
};

/**
* Your Logger object will be instantiated and called as such:
* var obj = new Logger()
* var param_1 = obj.shouldPrintMessage(timestamp,message)
*/