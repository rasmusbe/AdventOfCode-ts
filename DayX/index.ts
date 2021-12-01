import { getTextFileLines } from "../utils/getInput";

export const part1 = (dirName: string, inputFile: string): string => {
  const input = getTextFileLines(dirName, inputFile, "number");

  return "NOT DONE";
};

export const part2 = (dirName: string, inputFile: string): string => {
  const input = getTextFileLines(dirName, inputFile, "number");

  return "NOT DONE";
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
