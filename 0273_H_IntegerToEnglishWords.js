// 2025/03/30
// O(n) time complexity
// O(1) space complexity
//  where n = # digits
// Time to complete: OT (2:00:00) min
// Patterns:
// Notes w.r.t. solution: So many little edge cases...
/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
  const onesMap = {
    0: '',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine'
  };

  const teensMap = {
    0: 'Ten',
    1: 'Eleven',
    2: 'Twelve',
    3: 'Thir',
    4: 'Four',
    5: 'Fif',
    6: 'Six',
    7: 'Seven',
    8: 'Eigh',
    9: 'Nine'
  };

  const tensMap = {
    2: 'Twen',
    3: 'Thir',
    4: 'For',
    5: 'Fif',
    6: 'Six',
    7: 'Seven',
    8: 'Eigh',
    9: 'Nine'
  };

  const multiplesMap = {
    0: '',
    3: 'Thousand',
    6: 'Million',
    9: 'Billion',
    12: 'Trillion',
    // ...
  };

  const ZERO = '0';

  if (num === 0) {
    return 'Zero';
  }

  const numAsString = num.toString().split('').reverse().join('');
  const components = [];

  // work right to left in units of 3
  let powerFloor = 0;
  for (let chunk = 2; chunk < numAsString.length + 2; chunk += 3) {
    const ones = numAsString[chunk - 2] ?? ZERO;
    const tens = numAsString[chunk - 1] ?? ZERO;
    const hundreds = numAsString[chunk] ?? ZERO;

    // append string
    const component = convertMultiples(hundreds, tens, ones, powerFloor);
    if (component) {
      components.push(component);
    }

    powerFloor += 3;
  }

  return components.reverse().join(' ');


  function convertMultiples(hundreds, tens, ones, powerFloor) {
    // For each chunk of 3
    const hundredsString = convertHundreds(hundreds, tens, ones);
    if (!hundredsString) {
      return '';
    }

    // thousand, million, billion, trillion, etc.
    // add incremented suffix to unit
    return (hundredsString + (powerFloor ? ' ' + multiplesMap[powerFloor] : '')).trim();
  }

  function convertHundreds(hundreds, tens, ones) {
    if (!hundreds && !tens && !ones) {
      return '';
    }

    const tensString = convertTens(tens, ones);

    // 3. hundreds - add prefix to 2+1 unaltered
    return hundreds !== ZERO ?
      (onesMap[hundreds] + ' Hundred ' + tensString).trim()
      : tensString;
  }

  function convertTens(tens, ones) {
    if (tens === ZERO) { // 01, 02, etc.
      // 1. ones (1-9)
      return onesMap[ones];
    } else if (tens === '1') { // 10, 11, 12, 13, etc.
      return convertTeens(ones);
    } else {
      const onesString = onesMap[ones];
      const tensString = tensMap[tens];

      // 2. tens
      //  2b. 20-90 - add prefix to ones unaltered
      return (tensString + 'ty ' + onesString).trim();
    }
  }

  function convertTeens(ones, hasTens) {
    //  2a. 11-19 (teens) - revise ones place
    return teensMap[ones] + (ones > '2' ? 'teen' : '');
  }
};