// 2024/04/20
// O(min(m, n) * (m + n)) time complexity
// O((min(m, n)) space complexity
// where m = length of str1, n = length of str2
// Time to complete: 10 min
// Patterns: Math
// Notes w.r.t. solution: Had minor techincal issues in libraries. Study. Seemed to hone in on correct details better.
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  function isGCD(small, large, trial) {
    return !small.replaceAll(trial, '').length && !large.replaceAll(trial, '').length;
  }

  const small = str1.length <= str2.length ? str1 : str2;
  const large = str2.length < str1.length ? str1 : str2;

  let gcdLength = small.length;
  while (gcdLength) {
    if (!(small.length % gcdLength) && !(large.length % gcdLength)) {
      const trial = small.substring(0, gcdLength);
      if (isGCD(small, large, trial)) {
        return trial;
      } else {
        gcdLength--;
      }
    } else {
      gcdLength--;
    }
  }

  return '';
};

// 2024/04/20
// O(min(m, n) * (m + n)) time complexity
// O(min(m, n)) space complexity
// where m = length of str1, n = length of str2
// Time to complete: Too long.
// Patterns: Math
// Notes w.r.t. solution: Attempted w/o using string libraries. Still originally failed as I misread the problem statement. I still think it was unclear, apart from the usage of the term greatest common devisor.
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  const denominator = str1.length <= str2.length ? str1 : str2;
  const numerator = str2.length < str1.length ? str1 : str2;

  let contenderSize = denominator.length;

  while (contenderSize) {
    while (contenderSize) {
      if (!(numerator.length % contenderSize) && !(denominator.length % contenderSize)) {
        break;
      } else {
        contenderSize--;
      }
    }

    let contenderSizeUpdated = contenderSize;
    for (let i = 0; i < numerator.length; i++) {
      if (numerator[i] !== denominator[i % contenderSize]) {
        const reduction = i % (contenderSize - 1);

        if (i === 0 || !reduction) {
          return '';
        } else {
          contenderSizeUpdated -= reduction;
          break;
        }
      }
    }

    for (let i = 0; i < denominator.length; i++) {
      if (denominator[i] !== denominator[i % contenderSize]) {
        const reduction = i % (contenderSize - 1);

        if (i === 0 || !reduction) {
          return '';
        } else {
          contenderSizeUpdated -= reduction;
          break;
        }
      }
    }

    if (contenderSizeUpdated === contenderSize) {
      break;
    } else {
      contenderSize = contenderSizeUpdated;
    }
  }

  return denominator.substring(0, contenderSize);
};


// 2023/05
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