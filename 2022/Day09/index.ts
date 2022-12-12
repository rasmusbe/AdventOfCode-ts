import { getTextFileLines } from "../utils/getInput";

export const part1and2 = (
  dirName: string,
  inputFile: string,
  knots = 0
): number => {
  const input = getTextFileLines(dirName, inputFile);

  const positions: number[][] = new Array(knots + 2).fill(0).map(() => [0, 0]);

  const visited = new Set<string>();

  for (const line of input) {
    const [direction, distance] = line.split(" ");

    for (let step = 0; step < parseInt(distance); step++) {
      switch (direction) {
        case "U":
          positions[0][1]++;
          break;
        case "D":
          positions[0][1]--;
          break;
        case "R":
          positions[0][0]++;
          break;
        case "L":
          positions[0][0]--;
          break;
      }

      for (let knot = 1; knot < positions.length; knot++) {
        const prevKnot = positions[knot - 1];
        const currentKnot = positions[knot];
        const newPos = [...currentKnot];

        const touching =
          Math.abs(prevKnot[0] - currentKnot[0]) <= 1 &&
          Math.abs(prevKnot[1] - currentKnot[1]) <= 1;

        if (touching) {
          continue;
        }

        if (prevKnot[0] > currentKnot[0]) {
          newPos[0]++;
        } else if (prevKnot[0] < currentKnot[0]) {
          newPos[0]--;
        }

        if (prevKnot[1] > currentKnot[1]) {
          newPos[1]++;
        } else if (prevKnot[1] < currentKnot[1]) {
          newPos[1]--;
        }

        positions[knot] = newPos;
      }

      visited.add(positions[positions.length - 1].join(","));
    }
  }

  return visited.size;
};
