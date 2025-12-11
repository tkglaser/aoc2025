import run from "aocrunner";
import { MaxPriorityQueue, MinPriorityQueue } from '@datastructures-js/priority-queue'

import { parse } from "./parser.js";
import { Coord } from "../utils/coord.js";
import { BaseGraph } from "../utils/graph/base-graph.js";
import { Edge } from "../utils/graph/edge.js";
import { bfs } from "../utils/algorithms/bfs.js";
import { VisitResult } from "../utils/algorithms/visit-result.js";

class Circuits extends BaseGraph<Coord> {
  private edges: Edge<Coord>[] = [];
  private vertices: Coord[] = [];

  add(e: Edge<Coord>) {
    this.edges.push(e);
  }

  addVertices(v: Coord[]) {
    this.vertices = v;
  }

  forAllVertices(visitor: (v: Coord) => void) {
    this.vertices.forEach(visitor)
  }

  getVertices() {
    return this.vertices;
  }

  neigbours(from: Coord): Edge<Coord>[] {
    return this.edges.filter(edge => edge.from.eq(from) || edge.to.eq(from))
  }

  neighbourVertexes(from: Coord): Coord[] {
    return [
      ...this.edges.filter(edge => edge.from.eq(from)).map(edge => edge.to),
      ...this.edges.filter(edge => edge.to.eq(from)).map(edge => edge.from)
    ]
  }
}

const part1 = (rawInput: string) => {
  const input = parse(rawInput);

  const circuitGraph = new Circuits();

  circuitGraph.addVertices(input.map(c => Coord.from(...c)))

  const edges = new MinPriorityQueue<Edge<Coord>>(item => item.value);

  for (let i = 0; i < circuitGraph.getVertices().length; ++i) {
    const vertexI = circuitGraph.getVertices()[i];
    for (let j = i + 1; j < circuitGraph.getVertices().length; ++j) {
      const vertexJ = circuitGraph.getVertices()[j];
      const dist = vertexI.distance(vertexJ);
      edges.enqueue({
        value: dist,
        to: vertexI,
        from: vertexJ
      })
    }
  }

  for (let i = 0; i < 1000; ++i) {
    const edge = edges.dequeue()!;
    if (edge) {
      circuitGraph.add(edge)
    }
  }

  let group = 0

  circuitGraph.forAllVertices(v => {
    if (circuitGraph.getMark("circuit", v)) {
      return;
    }

    ++group;
    bfs(v,
      (v) => circuitGraph.neighbourVertexes(v).filter(vtx => !circuitGraph.getMark("circuit", vtx)),
      (vtx) => {
        circuitGraph.mark("circuit", vtx, group)
        return VisitResult.Continue
      })
  })

  const circuitMarks = circuitGraph.getVertices().map(v => circuitGraph.getMark<number>("circuit", v)!);

  const aggregate: number[] = []

  circuitMarks.forEach(mark => {
    if (!aggregate[mark - 1]) {
      aggregate[mark - 1] = 0
    }
    aggregate[mark - 1]++
  })

  aggregate.sort().reverse();

  console.log(aggregate)

  return (aggregate[0] || 1) * (aggregate[1] || 1) * (aggregate[2] || 1)
};

const part2 = (rawInput: string) => {
  const input = parse(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 40,
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
  trimTestInputs: false,
  onlyTests: false,
});
