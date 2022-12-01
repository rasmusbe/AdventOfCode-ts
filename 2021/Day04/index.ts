import _ = require("lodash");
import { getTextFileLines } from "../utils/getInput";

class Ticket {
  rows: number[][]
  cols: number[][];

  constructor(ticketNumbers: number[][]) {
    this.rows = ticketNumbers;
    this.cols = _.zip(...ticketNumbers);
  }

  hasBingo = (drawnNumbers: number[]): boolean => {
    return this.rows.some(row => _.difference(row, drawnNumbers).length === 0) ||
      this.cols.some(col => _.difference(col, drawnNumbers).length === 0);
  }

  unmarkedSum = (drawnNumbers: number[]): number => {
    return _.sum(_.difference(this.rows.flat(), drawnNumbers));
  }
}

const parseInput = (input: string[]): [number[], Ticket[]] => {
  const drawOrder = input[0].split(",").map((n: string) => parseInt(n, 10));
  const tickets = _.chunk(
    input
      .slice(2)
      .map((x) => x.trim())
      .filter((line) => line.length)
      .map((line) => line.split(/\s+/).map((x) => parseInt(x, 10))),
    5
  ).map(ticketNumbers => new Ticket(ticketNumbers));

  return [drawOrder, tickets];
}

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const [drawOrder, tickets] = parseInput(input);

  for (let i = 5; i < drawOrder.length; i++) {
    const drawn = drawOrder.slice(0, i);
    const bingo = tickets.filter(ticket => ticket.hasBingo(drawn));

    if (bingo.length) {
      const unmarkedSum = bingo[0].unmarkedSum(drawn);
      const finalNumber = drawn.slice(-1)[0];

      return unmarkedSum * finalNumber;
    }
  }

  return 0;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  let [drawOrder, tickets] = parseInput(input);

  for (let i = 5; i < drawOrder.length; i++) {
    const drawn = drawOrder.slice(0, i);

    if (tickets.length === 1) {
      const unmarkedSum = tickets[0].unmarkedSum(drawn);
      const finalNumber = drawn.slice(-1)[0];

      return unmarkedSum * finalNumber;
    }

    tickets = tickets.filter(ticket => !ticket.hasBingo(drawn));
  }

  return 0;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
