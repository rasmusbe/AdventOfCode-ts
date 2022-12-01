import { getTextFileLines } from "../utils/getInput";

type Caves = Record<string, string[]>;

const isSmallCave = (cave: string) => cave.toLowerCase() === cave;

const visitedCount = (visited: string[], cave: string) =>
  visited.filter((v) => v === cave).length;

const findNumberOfRoutes = (
  caves: Caves,
  goal: string,
  caveFrom: string,
  smallCaveLimit: number = 1,
  visited: string[] = []
): number => {
  if (caveFrom === goal) {
    return 1;
  }

  visited = [...visited, caveFrom];

  const startPoint = goal === "start" ? "end" : "start";

  if (isSmallCave(caveFrom) && visitedCount(visited, caveFrom) === 2) {
    smallCaveLimit = 1;
  }

  const routes = caves[caveFrom].filter(
    (caveTo) =>
      caveTo !== startPoint &&
      (!isSmallCave(caveTo) || visitedCount(visited, caveTo) < smallCaveLimit)
  );

  if (routes.length === 0) {
    return 0;
  }

  return routes.reduce((total, caveTo) => {
    return (
      total + findNumberOfRoutes(caves, goal, caveTo, smallCaveLimit, visited)
    );
  }, 0);
};

const getCaves = (dirName: string, inputFile: string): Caves => {
  const connections = getTextFileLines(dirName, inputFile);

  const caves: Caves = {};
  connections.forEach((connection) => {
    const [from, to] = connection.split("-");
    caves[from] = [...(caves[from] ?? []), to];
    caves[to] = [...(caves[to] ?? []), from];
  });

  return caves;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const caves = getCaves(dirName, inputFile);

  return findNumberOfRoutes(caves, "end", "start");
};

export const part2 = (dirName: string, inputFile: string): number => {
  const caves = getCaves(dirName, inputFile);

  const num = findNumberOfRoutes(caves, "end", "start", 2);
  return num;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
