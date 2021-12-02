import { getTextFileLines } from "../utils/getInput";

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const pos = input.reduce((curPos, step) => {
    const [direction, distance] = step.split(" ");
    switch (direction) {
      case "up":
        curPos.y -= parseInt(distance);
        break;
      case "down":
        curPos.y += parseInt(distance);
        break;
      case "forward":
        curPos.x += parseInt(distance);
        break;
    }

    return curPos;
  }, { x: 0, y: 0 });

  return Math.abs(pos.x) * Math.abs(pos.y);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input: readonly string[] = getTextFileLines(dirName, inputFile);

  const pos = input.reduce((curPos, step) => {
    const [direction, distance] = step.split(" ");
    switch (direction) {
      case "up":
        curPos.a -= parseInt(distance);
        break;
      case "down":
        curPos.a += parseInt(distance);
        break;
      case "forward":
        curPos.h += parseInt(distance);
        curPos.d += curPos.a * parseInt(distance)
        break;
    }

    return curPos;
  }, { h: 0, d: 0, a: 0 });

  return Math.abs(pos.h) * Math.abs(pos.d);
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
