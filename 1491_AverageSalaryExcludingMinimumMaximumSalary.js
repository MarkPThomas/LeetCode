// 2023/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:30 min
// Patterns: Math
// Notes w.r.t. solution:
/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
    let minSalary = Infinity;
    let maxSalary = -Infinity;

    let sum = 0;
    salary.forEach((employeeSalary) => {
        minSalary = Math.min(minSalary, employeeSalary);
        maxSalary = Math.max(maxSalary, employeeSalary);

        sum += employeeSalary;
    });

    sum -= (minSalary + maxSalary);

    return sum / (salary.length - 2);
};

// 2023/05
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2 min + 3 min debugging = 5 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
    let minSalary = Infinity;
    let maxSalary = -Infinity;
    let sum = 0;

    salary.forEach((value) => {
        sum += value;
        minSalary = Math.min(minSalary, value);
        maxSalary = Math.max(maxSalary, value);
    })

    return (sum - minSalary - maxSalary) / (salary.length - 2);
};