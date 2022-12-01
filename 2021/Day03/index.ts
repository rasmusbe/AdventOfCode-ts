import { getTextFileLines } from "../utils/getInput";
import { zip } from "lodash";

type Bitmap = string[][];

const mostCommonBit = (input: Bitmap): string[] => {
  return zip(...input).map((positionValues) =>
    (
      positionValues.reduce((acc, curr) => acc + (curr === "1" ? 1 : 0), 0) /
      positionValues.length
    )
      .toFixed(0)
      .toString()
  );
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input: Bitmap = getTextFileLines(dirName, inputFile).map((line) =>
    line.split("")
  );

  const gamma = mostCommonBit(input);

  const epsilon = gamma.map((value) => (value === "1" ? 0 : 1));

  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile).map((line) =>
    line.split("")
  );

  let matched = input;
  let ogr = 0;
  for (let i = 0; i < input[0].length; i++) {
    const mostCommon = mostCommonBit(matched);
    matched = matched.filter((line) => line[i] === mostCommon[i]);

    if (matched.length === 1) {
      ogr = parseInt(matched[0].join(""), 2);
      break;
    }
  }

  matched = input;
  let co2 = 0;
  for (let i = 0; i < input[0].length; i++) {
    const mostCommon = mostCommonBit(matched).map((value) =>
      value === "1" ? 0 : 1
    );
    matched = matched.filter((line) => line[i] === mostCommon[i].toString());

    if (matched.length === 1) {
      co2 = parseInt(matched[0].join(""), 2);
      break;
    }
  }

  return ogr * co2;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
