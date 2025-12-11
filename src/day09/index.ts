import run from "aocrunner";

import { parse } from "./parser.js";
import { Coord } from "../utils/coord.js";

const area = (a: Coord, b: Coord) => (Math.abs(a.coords[0] - b.coords[0]) + 1) * (Math.abs(a.coords[1] - b.coords[1]) + 1)

const validArea = (coords: Coord[]) => (a: Coord, b: Coord) => {
  const minX = Math.min(a.coords[0], b.coords[0]);
  const maxX = Math.max(a.coords[0], b.coords[0]);

  const minY = Math.min(a.coords[1], b.coords[1]);
  const maxY = Math.max(a.coords[1], b.coords[1]);

  for (const coord of coords) {
    if (a.eq(coord) || b.eq(coord)) {
      continue;
    }

    if (coord.coords[0] > minX && coord.coords[0] < maxX && coord.coords[1] > minY && coord.coords[1] < maxY) {
      return 0
    }
  }
  return area(a, b)
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput).map(c => Coord.from(...c));

  let maxArea = 0;

  for (let i = 0; i < input.length; ++i) {
    for (let j = i + 1; j < input.length; ++j) {
      const thisArea = area(input[i], input[j])
      maxArea = Math.max(thisArea, maxArea)
    }
  }
  return maxArea;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput).map(c => Coord.from(...c));

  let maxArea = 0;

  const areaCheck = validArea(input)

  for (let i = 0; i < input.length; ++i) {
    for (let j = i + 1; j < input.length; ++j) {
      const thisArea = areaCheck(input[i], input[j])
      maxArea = Math.max(thisArea, maxArea)
    }
  }
  return maxArea;
};

run({
  part1: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 50,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`,
        expected: 24,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
