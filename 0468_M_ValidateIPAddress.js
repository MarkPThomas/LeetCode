// 2025/04/20
// O(n) time complexity
// O(n) space complexity
//  n = length of string
// Time to complete: 25:33 min
// Patterns: String
// Notes w.r.t. solution: Mostly solved in 17:05, but had some edge cases to debug.
/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  const IPv4 = 'IPv4';
  const IPv6 = 'IPv6';
  const NA = 'Neither';

  function validCharCodeV4(component) {
    for (const char of component) {
      const integer = parseInt(char);
      if (!(0 <= integer && integer <= 9)) {
        return false;
      }
    }

    const num = Number(component);

    return 0 <= num && num <= 255;
  }

  function validCharCodesV6(component) {
    const aCode = 'a'.charCodeAt();
    const fCode = 'f'.charCodeAt();
    const ACode = 'A'.charCodeAt();
    const FCode = 'F'.charCodeAt();
    const zeroCode = '0'.charCodeAt();
    const nineCode = '9'.charCodeAt();

    for (const char of component) {
      const charCode = char.charCodeAt();
      if (!((aCode <= charCode & charCode <= fCode)
        || (ACode <= charCode & charCode <= FCode)
        || (zeroCode <= charCode & charCode <= nineCode))) {

        return false;
      }
    }
    return true;
  }

  const components4 = queryIP.split('.');
  if (components4.length > 1) {
    if (components4.length !== 4) {
      return NA;
    }

    for (const component of components4) {
      if (component.length === 0
        || (component.length > 1 && component[0] === '0')
        || !validCharCodeV4(component)) {
        return NA;
      }
    }
    return IPv4;
  }

  const components6 = queryIP.split(':');
  if (components6.length > 1) {
    if (components6.length !== 8) {
      return NA;
    }

    for (const component of components6) {
      if (component.length === 0
        || component.length < 1 || 4 < component.length
        || !validCharCodesV6(component)) {
        return NA;
      }
    }
    return IPv6;
  }

  return NA;
};