import run from "aocrunner";

import { parse } from "./parser.js";
import { dfs } from "../utils/algorithms/dfs.js";
import { VisitResult } from "../utils/algorithms/visit-result.js";

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const graph: Record<string, string[]> = {}

  input.forEach(v => { graph[v.source] = v.targets })

  let paths = 0;

  dfs("you", (v => graph[v] || []), v => {
    if (v === "out") {
      ++paths;
    }
    return VisitResult.Continue
  })

  return paths;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
