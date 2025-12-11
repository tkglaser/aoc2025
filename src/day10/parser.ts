import { loadParser } from "../utils/index.js";

export const enum Indicator {
  ON = '#',
  OFF = "."
}

export interface ParsedMachine {
  indicators: Indicator[],
  buttons: number[][],
  joltage: number[]
}

export type ParsingOutput = ParsedMachine[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
