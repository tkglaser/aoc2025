import run from "aocrunner";

import { Indicator, parse, ParsedMachine } from "./parser.js";
import { IHashable } from "../utils/ihashable.js";
import { bfs } from "../utils/algorithms/bfs.js";
import { VisitResult } from "../utils/algorithms/visit-result.js";

class Lights implements IHashable {
  private indicators: Indicator[];

  private constructor(ind: Indicator[]) {
    this.indicators = ind;
    Object.freeze(this)
  }

  get hash(): string {
    return this.indicators.join("");
  }

  eq(other: Lights) {
    return this.hash === other.hash;
  }

  pressButton(button: number[]) {
    const newLights = [...this.indicators];
    for (const idx of button) {
      newLights[idx] === Indicator.ON ? newLights[idx] = Indicator.OFF : newLights[idx] = Indicator.ON
    }
    const n = new Lights(newLights);
    // console.log(`[${this.hash}]=(${button})>[${n.hash}]`)
    return n
  }

  static from(ind: Indicator[]) {
    return new Lights(ind);
  }

  static emptyFrom(l: Lights) {
    return new Lights(l.indicators.map(i => Indicator.OFF));
  }
}

class Machine {
  public readonly targetLights: Lights;
  public readonly buttons: number[][];
  private joltage: number[];

  private constructor(parsedMachine: ParsedMachine) {
    this.targetLights = Lights.from(parsedMachine.indicators);
    this.buttons = parsedMachine.buttons;
    this.joltage = parsedMachine.joltage;
  }

  static from(parsedMachine: ParsedMachine) {
    return new Machine(parsedMachine)
  }
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput).map(Machine.from);

  const presscounts: number[] = []

  for (const machine of input) {
    const visited: Record<string, true> = {}
    const start = Lights.emptyFrom(machine.targetLights)
    const distances: Record<string, number> = {}
    distances[start.hash] = 0
    // console.log(machine.targetLights.hash)
    bfs(
      start,
      (light) => {
        const n = machine.buttons.map(b => light.pressButton(b)).filter(l => !visited[l.hash])
        n.forEach(item => {
          if (!distances[item.hash]) {
            // console.log(`Setting [${item.hash}] to Dist [${distances[light.hash] + 1}]`)
            distances[item.hash] = distances[light.hash] + 1
          }
        })
        return n
      },
      (light) => {
        // console.log(`Visiting [${light.hash}] Dist [${distances[light.hash]}]`)
        if (light.eq(machine.targetLights)) {
          presscounts.push(distances[light.hash])
          console.log(`Found. Dist [${distances[light.hash]}]`)
          return VisitResult.Abort
        }

        visited[light.hash] = true;

        return VisitResult.Continue
      }
    )
  }
  return presscounts.reduce((prev, curr) => prev + curr, 0);
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 7,
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
