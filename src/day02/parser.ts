import { loadParser } from "../utils/index.js";

export interface Range {
  min: number;
  max: number;
}

export type ParsingOutput = Range[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
