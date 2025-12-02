import run from "aocrunner";

import { parse, Range } from "./parser.js";

function isASillyNumber(n: number) {
  const s = n.toString();
  if (s.length % 2 !== 0) {
    return false
  }

  const first = s.substring(0, s.length / 2);
  const second = s.substring(s.length / 2);

  return first === second;
}

function isAnEvenSillierNumber(n: number) {
  const s = n.toString();
  for (let length = 1; length <= s.length / 2; ++length) {

    const template = s.substring(0, length);
    // console.log("TEMPLATE ", template)
    let found = true;
    for (let start = length; start < s.length; start += length) {
      const test = s.substring(start, start + length)
      // console.log("TEST", test)
      if (template !== test) {
        found = false
        break;
      }
    }
    if (found) {
      // console.log("SILLY")
      return true;
    }
  }
  // console.log("NOT SILLY")
  return false;
}

function expandRange(r: Range) {
  const result = [];
  for (let i = r.min; i <= r.max; ++i) {
    result.push(i)
  }
  return result;
}

function sum(list: number[]) {
  return list.reduce((prev, curr) => prev + curr, 0)
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const sillyNumbers = input.flatMap(expandRange).filter(isASillyNumber);

  return sum(sillyNumbers);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  // isAnEvenSillierNumber(2121212118);

  const sillierNumbers = input.flatMap(expandRange).filter(isAnEvenSillierNumber);

  // console.log(sillierNumbers)

  return sum(sillierNumbers);
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
