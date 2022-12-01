import { getTextFileMap } from "../utils/getInput";

type Path = {
  x: number;
  y: number;
  risk: number;
};

const getLowestRiskValue = (riskLevelMap: number[][]): number => {
  const rows = riskLevelMap.length,
    cols = riskLevelMap[0].length;

  let lowestRisks: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(null)
  );

  let lowestRisk =
    riskLevelMap[rows - 1].reduce((acc, n) => acc + n, 0) +
    riskLevelMap.reduce((acc, row) => acc + row[0], 0);

  // First point has no risk, so we start with negative risk value
  let paths: Path[] = [{ x: 0, y: 0, risk: -riskLevelMap[0][0] }];

  while (paths.length > 0) {
    let path = paths.pop();

    // Add current value
    path.risk += riskLevelMap[path.y][path.x];

    // If risk is lower than lowest risk and previosly calculated risk is null or risk is lower than previosly calculated risk
    // Set new lowest risk in point
    if (
      path.risk < lowestRisk &&
      (lowestRisks[path.y][path.x] === null ||
        path.risk < lowestRisks[path.y][path.x])
    ) {
      lowestRisks[path.y][path.x] = path.risk;

      // If we are at the end of the map, set the lowest risk
      if (path.x == cols - 1 && path.y == rows - 1) {
        if (path.risk < lowestRisk) {
          lowestRisk = path.risk;
          console.log("new lowest risk found", lowestRisk);
        }
      } else {
        // Add new paths with the current risk value

        // Right
        if (path.x < cols - 1)
          paths.push({ x: path.x + 1, y: path.y, risk: path.risk });

        // Down
        if (path.y < rows - 1)
          paths.push({ x: path.x, y: path.y + 1, risk: path.risk });

        // Left
        if (path.x > 0)
          paths.push({ x: path.x - 1, y: path.y, risk: path.risk });

        // Up
        if (path.y > 0)
          paths.push({ x: path.x, y: path.y - 1, risk: path.risk });
      }
    }
  }

  return lowestRisk;
};

const enlargeMap = (map: number[][]): number[][] => {
  let largeMap: number[][] = [];

  for (const row of map) {
    const newRow: number[] = [];
    for (let i = 0; i < 5; i++) {
      row.forEach((cell) => {
        const newCell = cell + i > 9 ? cell + i - 9 : cell + i;
        newRow.push(newCell);
      });
    }
    largeMap.push(newRow);
  }

  for (let i = 1; i < 5; i++) {
    for (let j = 0; j < map.length; j++) {
      const row = largeMap[j];
      const newRow: number[] = [];

      row.forEach((cell) => {
        const newCell = cell + i > 9 ? cell + i - 9 : cell + i;
        newRow.push(newCell);
      });

      largeMap.push(newRow);
    }
  }

  return largeMap;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const map = getTextFileMap(dirName, inputFile, "", "number");

  return getLowestRiskValue(map);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const smallMap = getTextFileMap(dirName, inputFile, "", "number");

  const bigMap = enlargeMap(smallMap);

  return getLowestRiskValue(bigMap);
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
