import { loadParser } from "../utils/index.js";

export type ParsingOutput = { numbers: number[][], operators: "+" | "*" };

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
