import run from "aocrunner";
import { memoise } from "../utils/index.js";

const parse = (input: string) => input.split("\n");

const maxJoltage = memoise((bank: string, batteries: number): string => {
  if (batteries === 0 || bank.length === 0) {
    return "";
  }

  const head = bank[0];
  const rest = bank.substring(1);

  const withHead = head + maxJoltage(rest, batteries - 1);
  const withoutHead = maxJoltage(rest, batteries);

  return +withHead > +withoutHead ? withHead : withoutHead;
})

const maxJoltageMapper = (batteries: number) => (bank: string) => +maxJoltage(bank, batteries)

function sum(list: number[]) {
  return list.reduce((prev, curr) => prev + curr, 0)
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  return sum(input.map(maxJoltageMapper(2)))
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return sum(input.map(maxJoltageMapper(12)))
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
