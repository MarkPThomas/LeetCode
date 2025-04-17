// 2024/04/16 - Optimized
// O(n) time complexity
// O(1) space complexity
// Time to complete:
// Patterns: 2 Pointer
// Notes w.r.t. solution: RegEx & Single Pass directly on string.
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  function isAlphanumeric(char) {
    return /^[a-zA-Z0-9]+$/i.test(char.toLowerCase());
  }

  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (!isAlphanumeric(s[left]) && left < right) {
      left++;
    }

    while (!isAlphanumeric(s[right]) && left < right) {
      right--;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    } else {
      left++;
      right--;
    }
  }

  return true;
};


// 2024/04/16
// O(n) time complexity
// O(n) space complexity
// Time to complete: 6 min
// Patterns: 2 Pointer
// Notes w.r.t. solution: Actually took 13 min, but the extra time was spent details of validating a #. Learn this.
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const minCode = 'a'.charCodeAt();
  const maxCode = 'z'.charCodeAt();

  const chars = [];
  for (let i = 0; i < s.length; i++) {
    const char = s[i].toLowerCase();
    if ((minCode <= char.charCodeAt() && char.charCodeAt() <= maxCode)
      || !isNaN(parseInt(char))) {
      chars.push(char);
    }
  }

  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    } else {
      left++;
      right--;
    }
  }

  return true;
};


// 2023/04
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

// 2023/04
// O(n) time complexity
// O(n) space complexity
// Time to complete: 7 min
// Patterns:
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

  let validChars = [];
  for (let i = 0; i < s.length; i++) {
    const letter = s[i].toLowerCase();
    if (isAlphanumeric(letter)) {
      validChars.push(letter);
    }
  }
  const sValidChars = validChars.join('');
  for (let i = 0; i < sValidChars.length; i++) {
    if (sValidChars[i] !== sValidChars[sValidChars.length - 1 - i]) {
      return false;
    }
  }
  return true;
};