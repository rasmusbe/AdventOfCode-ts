import { getTextFileLines } from "../utils/getInput";

const getInput = (dirName: string, inputFile: string) =>
  getTextFileLines(dirName, inputFile).map((line) =>
    line.split("").map((char) => parseInt(char))
  );

const getNeighbors = (
  row: number,
  col: number,
  input: number[][]
): number[] => {
  const neighbors = [];
  if (row > 0) {
    neighbors.push(input[row - 1][col]);
  }
  if (row < input.length - 1) {
    neighbors.push(input[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(input[row][col - 1]);
  }
  if (col < input[0].length - 1) {
    neighbors.push(input[row][col + 1]);
  }
  return neighbors;
};

const getBasinSize = (
  row: number,
  col: number,
  map: number[][],
  basinSize: number
): [number, number[][]] => {
  if (map[row][col] === 9 || map[row][col] === -1) {
    return [basinSize, map];
  }

  basinSize += 1;
  map[row][col] = -1;

  if (row > 0) {
    [basinSize, map] = getBasinSize(row - 1, col, map, basinSize);
  }
  if (row < map.length - 1) {
    [basinSize, map] = getBasinSize(row + 1, col, map, basinSize);
  }
  if (col > 0) {
    [basinSize, map] = getBasinSize(row, col - 1, map, basinSize);
  }
  if (col < map[0].length - 1) {
    [basinSize, map] = getBasinSize(row, col + 1, map, basinSize);
  }

  return [basinSize, map];
};

const isLowPoint = (pointValue: number, neighbors: number[]): boolean =>
  !neighbors.some((neighbor) => neighbor <= pointValue);

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getInput(dirName, inputFile);

  let riskSum = 0;

  input.forEach((row, rowIndex) => {
    row.forEach((pointValue, colIndex) => {
      const neighbors = getNeighbors(rowIndex, colIndex, input);
      if (isLowPoint(pointValue, neighbors)) {
        riskSum += 1 + pointValue;
      }
    });
  });

  return riskSum;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const map = getInput(dirName, inputFile);

  const basinSizes = [];

  map.forEach((row, rowIndex) => {
    row.forEach((pointValue, colIndex) => {
      const neighbors = getNeighbors(rowIndex, colIndex, map);
      if (isLowPoint(pointValue, neighbors)) {
        const [basinSize, _] = getBasinSize(rowIndex, colIndex, map, 0);
        basinSizes.push(basinSize);
      }
    });
  });

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, curr) => acc * curr, 1);
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
