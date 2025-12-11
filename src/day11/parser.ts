import { loadParser } from "../utils/index.js";

export interface Vertex {
  source: string;
  targets: string[];
}

export type ParsingOutput = Vertex[];

export const parse = loadParser<ParsingOutput>(
  import.meta.url,
  "./parser.pegjs",
);
