import run from "aocrunner";

import { Direction, Instruction, parse } from "./parser.js";

class Dial {
  private position = 50;
  public zeroPositions = 0;
  public allZeroPositions = 0

  applyAll(instructions: Instruction[]) {
    instructions.forEach(instruction => this.apply(instruction));
    return this;
  }

  apply(instruction: Instruction) {
    const originalPosition = this.position;

    if (instruction.direction === Direction.Right) {
      this.position += instruction.steps;
    } else {
      this.position -= instruction.steps;
    }

    if (this.position < 0) {
      let corrections = 0;

      while (this.position < 0) {
        this.position += 100;
        ++corrections;
      }

      this.allZeroPositions += corrections;

      if (originalPosition === 0) {
        this.allZeroPositions -= 1;
      }
    }

    if (this.position > 99) {
      let corrections = 0;

      while (this.position > 99) {
        this.position -= 100;
        ++corrections;
      }

      this.allZeroPositions += corrections;

      if (this.position === 0) {
        this.allZeroPositions -= 1;
      }
    }

    if (this.position === 0) {
      ++this.allZeroPositions;
      ++this.zeroPositions;
    }

    return this;
  }
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const dial = new Dial().applyAll(input);

  return dial.zeroPositions;
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  const dial = new Dial().applyAll(input);

  return dial.allZeroPositions;
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
