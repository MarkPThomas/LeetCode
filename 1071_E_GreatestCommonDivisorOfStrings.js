// O(min(m, n) * (m + n)) time complexity
// O(min(m, n)) space complexity
// where m = length of str1, n = length of str2
// Time to complete: 10 min
// Patterns: Math
// Notes w.r.t. solution: Originally failed as I misread the problem statement. I still think it was unclear, apart from the usage of the term greatest common devisor.

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  function isValidGCD(str1, str2, k) {
    const base = str1.substring(0, k);
    return str1.length % base.length === 0
      && str2.length % base.length === 0
      && str1.replaceAll(base, '') === ''
      && str2.replaceAll(base, '') === '';
  }

  const strMin = str1.length < str2.length ? str1 : str2;
  for (let i = strMin.length; i >= 1; i--) {
    if (isValidGCD(str1, str2, i)) {
      return strMin.substring(0, i);
    }
  }
  return '';
};