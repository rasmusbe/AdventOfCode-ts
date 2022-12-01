import { range, zip } from "lodash";
import { getTextFileLines } from "../utils/getInput";

class Cord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

type Line = {
  from: Cord;
  to: Cord;
};

type Floor = number[][];

const parseInput = (input: string[]): [lines: Line[], maxCord: Cord] => {
  const lines: Line[] = [];
  const maxCord: Cord = { x: 0, y: 0 };

  input.forEach((line) => {
    const [from, to] = line.split(" -> ");
    const [x, y] = from.split(",").map((val) => parseInt(val));
    const [x2, y2] = to.split(",").map((val) => parseInt(val));

    lines.push({
      from: { x, y },
      to: { x: x2, y: y2 },
    });

    maxCord.x = Math.max(maxCord.x, x, x2);
    maxCord.y = Math.max(maxCord.y, y, y2);
  });

  return [lines, maxCord];
};

const getPointsInLine = (line: Line): Cord[] => {
  const xs = [
    ...range(line.from.x, line.to.x, line.from.x <= line.to.x ? 1 : -1),
    line.to.x,
  ];
  const ys = [
    ...range(line.from.y, line.to.y, line.from.y <= line.to.y ? 1 : -1),
    line.to.y,
  ];

  if (xs.length === 1) {
    xs.push(...Array(ys.length - 1).fill(line.from.x));
  }
  if (ys.length === 1) {
    ys.push(...Array(xs.length - 1).fill(line.from.y));
  }

  return zip(xs, ys).map(([x, y]) => new Cord(x, y));
};

const fillFloor = (maxCord: Cord, coords: Cord[]): Floor => {
  const floor: Floor = new Array(maxCord.y + 1)
    .fill(0)
    .map(() => new Array(maxCord.x + 1).fill(0));

  coords.forEach((coord) => {
    floor[coord.y][coord.x] += 1;
  });

  return floor;
}

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const [lines, maxCord] = parseInput(input);

  const validLines = lines.filter(
    (line) => line.to.x === line.from.x || line.to.y === line.from.y
  );

  const cords = validLines.map((line) => getPointsInLine(line)).flat();

  const floor = fillFloor(maxCord, cords);

  return floor.flat().filter((val) => val > 1).length;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);
  const [lines, maxCord] = parseInput(input);

  const cords = lines.map((line) => getPointsInLine(line)).flat();

  const floor = fillFloor(maxCord, cords);

  return floor.flat().filter((val) => val > 1).length;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
