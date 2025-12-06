import run from "aocrunner";

import { parse } from "./parser.js";

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  let total = 0;

  for (let i = 0; i < input.operators.length; ++i) {
    const op = input.operators[i];
    let zip = op === "*" ? 1 : 0;
    for (let ni = 0; ni < input.numbers.length; ++ni) {
      if (op === "*") {
        zip *= input.numbers[ni][i];
      } else {
        zip += input.numbers[ni][i];
      }
    }
    total += zip;
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = rawInput.split("\n");

  const operators = input[input.length - 1];

  let op = "";
  let zip = 0;
  let total = 0;
  for (let i = 0; i < operators.length; ++i) {
    // new op starting
    if (operators[i] === "*") {
      op = operators[i]
      zip = 1;
    } else if (operators[i] === "+") {
      op = operators[i]
      zip = 0
    }
    let numberStr = ""
    for (let n = 0; n < input.length - 1; ++n) {
      const c = input[n][i];
      if (c !== " ") {
        numberStr += c
      }
    }
    if (numberStr !== "") {
      if (op === "*") {
        zip *= +numberStr
        console.log(+numberStr, zip)
      } else {
        zip += +numberStr
        console.log(+numberStr, zip)
      }
    } else {
      total += zip;
    }
  }
  total += zip;

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
 6 98  215 314 
  1  0   1  0 
*   +   *   +  
`,
        expected: 4277556,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 
`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`,
        expected: 3263827,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
