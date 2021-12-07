import { sum } from "lodash";
import { getTextFile, getTextFileLines } from "../utils/getInput";

const getFishesAfterDays = (state: number[], days: number): number => {
  for (let day = 1; day <= days; day++) {
    const birthing = state.shift();
    state.push(0);

    state[6] += birthing;
    state[8] += birthing;
  }

  return sum(state);
};

export const part1 = (dirName: string, inputFile: string): number => {
  const state = Array(9).fill(0);

  getTextFile(dirName, inputFile)
    .split(",")
    .map((v) => parseInt(v, 10))
    .map((v) => state[v]++);

  return getFishesAfterDays(state, 80);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const state = Array(9).fill(0);

  getTextFile(dirName, inputFile)
    .split(",")
    .map((v) => parseInt(v, 10))
    .map((v) => state[v]++);

  return getFishesAfterDays(state, 256);
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
