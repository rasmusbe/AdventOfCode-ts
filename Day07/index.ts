import { min, range, sum } from "lodash";
import { getTextFile } from "../utils/getInput";

const getCost = (position: number, boats: number[]) => {
  return boats.reduce((acc, boat) => {
    return acc + Math.abs(boat - position);
  }, 0);
};

const getCost2 = (position: number, boats: number[]) => {
  return boats.reduce((acc, boat) => {
    return acc + sum(range(0, 1 + Math.abs(boat - position)));
  }, 0);
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFile(dirName, inputFile)
    .split(",")
    .map((v) => parseInt(v, 10))
    .sort();

  let position = input[Math.round(input.length / 2)];
  while (true) {
    const costs = [
      getCost(position, input),
      getCost(position - 1, input),
      getCost(position + 1, input),
    ];

    const minCost = min(costs);
    if (minCost === costs[0]) {
      return costs[0];
    } else if (minCost === costs[1]) {
      position--;
    } else {
      position++;
    }
  }
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFile(dirName, inputFile)
    .split(",")
    .map((v) => parseInt(v, 10))
    .sort();

  let position = Math.round(sum(input) / input.length);

  while (true) {
    const costs = [
      getCost2(position, input),
      getCost2(position - 1, input),
      getCost2(position + 1, input),
    ];

    const minCost = min(costs);
    if (minCost === costs[0]) {
      return costs[0];
    } else if (minCost === costs[1]) {
      position--;
    } else {
      position++;
    }
  }
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
