// 2025/04/22
// O(n) time complexity
// O(n) space complexity
// Time to complete: 46:36 min
// Patterns: Stack
// Notes w.r.t. solution: Mostly solved under 30 min, got tripped up/slowed down finalizing how to to mult/div.
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  // No parens
  // Use PEMDAS
  // Use stacks
  // Build up ints, skip spaces
  // No - #s, so - is always a subtraction

  // Operators indicate action
  //  Sum values in stack, w/ - put #s in stack w/ - sign.
  //  / and * are done before summing, in order encountered
  //      these are done tracking results
  //      result w/ sign are placed in stack at next +/- or end of string

  function saveResult() {
    let prevResult = 0;

    if (prevOperator === '*' || prevOperator === '/') {
      prevResult = results.pop();

      if (prevOperator === '*') {
        prevResult *= Number(numStr);
      } else {
        prevResult = Math.floor(prevResult / Number(numStr));
      }
      prevOperator = '';
    } else {
      prevResult = Number(numStr);
    }
    numStr = '';

    results.push(prevResult);
  }

  // For signs, use +1/-1 before each result
  const results = [1];

  let numStr = '';
  let prevOperator = '';
  for (const char of s) {
    if (char === ' ') {
      continue;
    }

    if (char === '+' || char === '-') {
      saveResult();
      const sign = char === '+' ? 1 : -1;
      results.push(sign);
    } else if (char === '*' || char === '/') {
      saveResult();
      prevOperator = char;
    } else {
      numStr += char;
    }
  }
  saveResult();

  let result = 0;
  while (results.length > 1) {
    result += results.pop() * results.pop();
  }

  return result;
};

// 2025/04/22
// O(n) time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  // first char, * & / invalid, + might be missed
  // MD-AS
  // spliy by spaces
  //  handle +&- as encountered, by segments bounded by + or - &/or string ends
  //  handle *&/ first

  // stack = [sign, result]
  //  result = val, or any further operations
  //      val, or strictly AS can be handled all at once
  //      for strictly AS, keep a separate stack of results
  //          that we iterate on after each AS operator
  const SUM = '+';
  const SUB = '-';
  const MUL = '*';
  const DIV = '/';

  // T: O(n)
  // S: O(n)
  function parseString(s) {
    const charsResult = [];

    let i = 0;
    while (i < s.length) {
      i = skipSpaces(i);

      const [iAfterNum, numInt] = buildInt(i);
      charsResult.push(numInt);

      i = skipSpaces(iAfterNum);
      const operator = s[i];
      if (operator) {
        charsResult.push(operator);
        i++;
      } else {
        break;
      }
    }

    return charsResult;
  }

  // T: O(n)
  // S: O(1)
  function skipSpaces(i) {
    if (i >= s.length) {
      return i;
    }

    // Skip spaces
    while (i < s.length && !s[i].trim()) {
      i++;
    }

    return i;
  }

  // T: O(n)
  // S: O(n)
  function buildInt(i) {
    let numStr = '';
    let char = s[i];

    // Build # as string
    while (!isNaN(parseInt(char))) {
      numStr += char;
      i++;
      char = s[i];
    }

    return [i, Number(numStr)];
  }

  // T: O(1)
  // S: O(1)
  function isSumSub(char) {
    return char === SUM || char === SUB;
  }


  const chars = parseString(s);

  // T: O(n)
  // S: O(n)
  function getMulDivResults(operator, num) {
    // Build subresult pieces
    const mulDivResults = compileMulDivParts(operator, num);

    // Reduce subresult
    let mulDivResult = reduceMulDiv(mulDivResults);

    const sumSub = mulDivResult < 0 ? SUB : SUM;

    return [sumSub, mulDivResult];
  }

  // T: O(n)
  // S: O(n)
  function compileMulDivParts(operator, num) {
    const mulDivResults = [[operator, num]];

    let prevNum = chars.pop();
    while (chars.length && !isSumSub(chars[chars.length - 1])) {
      const prevOperator = chars.pop();
      mulDivResults.push([prevOperator, prevNum]);

      prevNum = chars.pop();
    }

    mulDivResults.push([null, prevNum]);

    return mulDivResults;
  }

  // T: O(n)
  // S: O(1)
  function reduceMulDiv(mulDivResults) {
    let mulDivResult = 1;

    while (mulDivResults.length) {
      const [currOperator, currNum] = mulDivResults.pop();

      if (currOperator === DIV) {
        mulDivResult = Math.floor(mulDivResult / currNum);
      } else {
        mulDivResult *= currNum;
      }
    }

    return mulDivResult;
  }

  // T: O(n)
  // S: O(1)
  function reduceSumSub(sumSubresults) {
    let result = 0;
    while (sumSubresults.length) {
      const [operator, num] = sumSubresults.pop();

      if (operator === SUB) {
        result -= num;
      } else {
        result += num;
      }
    }

    return result;
  }

  const results = []; // result_i = [sign, val]
  while (chars.length) {
    const num = chars.pop();
    const operator = chars.length ? chars.pop() : SUM;

    if (isSumSub(operator)) {
      results.push([operator, num]);
    } else {
      const [currOperator, currResult] = getMulDivResults(operator, num);
      const prevOperator = chars.pop() ?? SUM;

      const resultOperator = (prevOperator === currOperator) ? SUM : SUB;

      results.push([resultOperator, Math.abs(currResult)]);
    }
  }

  const result = reduceSumSub(results);
  return result;
};