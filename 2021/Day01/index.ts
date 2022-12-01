import { getTextFileLines } from "../utils/getInput";

const countIncreasing = (input: number[]) =>
  input.reduce((acc, curr, i, arr) => {
    const isFirstElement = i === 0;
    const isLargerThanPrevious = curr > arr[i - 1];
    return !isFirstElement && isLargerThanPrevious ? acc + 1 : acc;
  }, 0);

export const part1 = (dirName: string, inputFile: string): string => {
  const input = getTextFileLines(dirName, inputFile, "number");
  return countIncreasing(input).toString();
};

export const part2 = (dirName: string, inputFile: string): string => {
  const input = getTextFileLines(dirName, inputFile, "number");
  const values = input.map((_, i) => {
    if (i + 2 >= input.length) {
      return 0;
    }

    return input.slice(i, i + 3).reduce((acc, curr) => acc + curr, 0);
  });

  return countIncreasing(values).toString();
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
