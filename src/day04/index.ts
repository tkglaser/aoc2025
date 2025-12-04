import run from "aocrunner";

import { Grid } from "../utils/grid.js";
import { Coord } from "../utils/coord.js";

function getAccessibleTiles(grid: Grid) {
  const neigbours = [
    Coord.north,
    Coord.north.add(Coord.east),
    Coord.east,
    Coord.east.add(Coord.south),
    Coord.south,
    Coord.south.add(Coord.west),
    Coord.west,
    Coord.west.add(Coord.north)
  ];

  return grid.findAll((val, coord) => {
    if (val !== "@") {
      return false
    }
    const neigbourRolls = neigbours.map(n => coord.add(n)).filter(c => grid.isInBounds(c)).filter(c => grid.tile(c) === "@")

    return neigbourRolls.length < 4;
  })
}

const part1 = (rawInput: string) => {
  const grid = Grid.fromText(rawInput, { repeats: false });

  return getAccessibleTiles(grid).length;
};

const part2 = (rawInput: string) => {
  const grid = Grid.fromText(rawInput, { repeats: false });

  let hasRemovedSome = false;
  let rollsRemoved = 0;
  do {
    const accessibleTiles = getAccessibleTiles(grid);
    accessibleTiles.forEach(tile => {
      grid.setTile(tile.coord, ".");
    })

    rollsRemoved += accessibleTiles.length;
    hasRemovedSome = !!accessibleTiles.length;
  } while (hasRemovedSome)

  return rollsRemoved;
};

run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
