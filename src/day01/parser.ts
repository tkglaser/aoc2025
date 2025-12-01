import { loadParser } from "../utils/index.js";

export const enum Direction {
  Left = "L",
  Right = "R"
}

export interface Instruction {
  direction: Direction,
  steps: number,
}

export type ParsingOutput = Instruction[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
