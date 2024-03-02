// 2024/03/02
// O(n) -> O(1) time complexity as there is a finite set of Roman Numerals
// O(1) space complexity
// Time to complete: 9:43
// Patterns: Hash Map, 2 ptrs
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    const romanToValue = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    let number = 0;
    let i = 0;
    while (i < s.length) {
        if (i < s.length &&
            ((s[i] === 'I' && (s[i + 1] === 'V' || s[i + 1] === 'X'))
                || (s[i] === 'X' && (s[i + 1] === 'L' || s[i + 1] === 'C'))
                || (s[i] === 'C' && (s[i + 1] === 'D' || s[i + 1] === 'M')))
        ) {
            number += (romanToValue[s[i + 1]] - romanToValue[s[i]]);
            i += 2;
        } else {
            number += romanToValue[s[i]]
            i++;
        }
    }

    return number;
};

// 2023 Improved
// O(n) -> O(1) time complexity as there is a finite set of Roman Numerals
// O(1) space complexity
// Time to complete: 7 min
// Patterns: Hash Map, 2 ptrs
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt202304 = function (s) {
    const numeralValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    if (s.length === 1) {
        return numeralValues[s[0]];
    }
    // work right-left, adding count
    // look one ahead & if value is less, subtract it & skip it
    let lastVal = 0;
    let total = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        const val = numeralValues[s[i]];
        if (lastVal > val) {
            total -= val;
        } else {
            total += val;
        }
        lastVal = val;
    }

    return total;
};

// 2023 Original
// O(n) -> O(1) time complexity as there is a finite set of Roman Numerals
// O(1) space complexity
// Time to complete: 7 min
// Patterns: Hash Map, 2 ptrs
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt2020304Improved = function (s) {
    const numeralValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    if (s.length === 1) {
        return numeralValues[s[0]];
    }
    // work right-left, adding count
    // look one ahead & if value is less, subtract it & skip it
    let ptrVal = s.length - 1;
    let ptrSub = s.length - 2;
    let value = 0;
    while (ptrVal >= 0) {
        const val = numeralValues[s[ptrVal]];
        value += val;
        if (ptrSub >= 0) {
            const valSub = numeralValues[s[ptrSub]];
            if (valSub < val) {
                value -= valSub;
                ptrVal--;
                ptrSub--;
            }
        }
        ptrVal--;
        ptrSub--;
    }
    return value;
};

// 2022
// O(N) time complexity
// O(1) space complexity
// Time to complete: N/A

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt2022 = function (s) {
    // Validate string length
    if (s.length < 1 || 15 < s.length) {
        return 0;
    }

    const numerals = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    const numeralSubtractions = {
        V: 'I',
        X: 'I',
        L: 'X',
        C: 'X',
        D: 'C',
        M: 'C'
    }

    let count = 0;
    let priorChar = '';

    for (let i = s.length - 1; i >= 0; i--) {
        let currentChar = s[i];
        let charCount = numerals[currentChar];

        // Enforce character is valid
        if (!charCount) {
            return 0;
        }

        if (priorChar) {
            const numeralSubtraction = numeralSubtractions[priorChar];
            if (currentChar === numeralSubtraction) {
                charCount = -numerals[numeralSubtraction];
                if (!charCount) {
                    return 0;
                }
            }
        }

        count += charCount
        priorChar = currentChar;
    }

    return count;
};

const testCases = [
    {
        input: 'III',
        expected: 3
    },
    {
        input: 'LVIII',
        expected: 58
    },
    {
        input: 'MCMXCIV',
        expected: 1994
    },
];

testCases.forEach((testCase) => {
    let result = romanToInt(testCase.input);
    let pass = result === testCase.expected;
    console.log(`Input: ${testCase.input}, Expected: ${testCase.expected}, Result: ${result}, Pass: ${pass}`);
}
);