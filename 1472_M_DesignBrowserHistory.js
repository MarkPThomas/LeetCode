// 2024/11/21
// Initialize
//  O(1) time complexity
//  O(1) space complexity
// Visit
//  O(n) -> O(1) amortized time complexity
//  O(n) -> O(1) amortized space complexity
//    where n = # pages in history
// Back
//  O(1) time complexity
//  O(1) space complexity
// Forward
//  O(1) time complexity
//  O(1) space complexity
// Time to complete: 10:23 min
// Patterns: Dynamic Array w/ pointer
// Notes w.r.t. solution:
/**
 * @param {string} homepage
 */
var BrowserHistory = function (homepage) {
  this.pages = [homepage];
  this.position = 0;
};

/**
* @param {string} url
* @return {void}
*/
BrowserHistory.prototype.visit = function (url) {
  if (this.position !== this.pages.length - 1) {
    this.pages = this.pages.slice(0, this.position + 1)
  }

  this.pages.push(url);
  this.position = this.pages.length - 1;
};

/**
* @param {number} steps
* @return {string}
*/
BrowserHistory.prototype.back = function (steps) {
  this.position = Math.max(this.position - steps, 0);
  return this.pages[this.position];
};

/**
* @param {number} steps
* @return {string}
*/
BrowserHistory.prototype.forward = function (steps) {
  this.position = Math.min(this.position + steps, this.pages.length - 1);
  return this.pages[this.position];
};

/**
* Your BrowserHistory object will be instantiated and called as such:
* var obj = new BrowserHistory(homepage)
* obj.visit(url)
* var param_2 = obj.back(steps)
* var param_3 = obj.forward(steps)
*/