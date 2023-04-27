// O(n) time complexity
// O(1) space complexity
// Time to complete: 6 min
// Patterns: 2 Pointers
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    function isLetter(c) {
        const charCode = c.toLowerCase().charCodeAt();
        return 'a'.charCodeAt() <= charCode && charCode <= 'z'.charCodeAt();
    }
    function isInteger(c) {
        const charInt = parseInt(c);
        return 0 <= charInt && charInt <= 9;
    }
    function isAlphanumeric(c) {
        return isLetter(c) || isInteger(c);
    }

    for (let left = 0, right = s.length - 1; left < right; left++, right--) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
    }
    return true;
};