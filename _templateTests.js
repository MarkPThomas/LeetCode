const testCases = [
  { input: '',
   expected: ''},
  ];

  testCases.forEach((testCase) => {
    // let result = romanToInt(testCase.input); // insert function name here
    let pass = result === testCase.expected;
    console.log(`Input: ${testCase.input}, Expected: ${testCase.expected}, Result: ${result}, Pass: ${pass}`);
    }
  );