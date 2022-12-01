import { difference } from "lodash";
import { getTextFileLines } from "../utils/getInput";

const countOccurrences = (arr: number[], val: number) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const digitSegments = [
  "abcefg", // 0
  "cf", // 1
  "acdeg", // 2
  "acdfg", // 3
  "bcdf", // 4
  "abdfg", // 5
  "abdefg", // 6
  "acf", // 7
  "abcdefg", // 8
  "abcdfg", // 9
];

const getDigit = (
  segment: string[],
  wires: string[][],
  possibleDigits: number[]
) => {
  // 1, 4, 7, 8 is known at start
  if (possibleDigits.length === 1) {
    return possibleDigits[0];
  }

  // Set the easy ones first
  if (
    !wires[1].length ||
    !wires[4].length ||
    !wires[7].length ||
    !wires[8].length
  ) {
    return undefined;
  }

  // 0, 6, 9
  if (segment.length === 6) {
    if (difference(wires[1], segment).length > 0) {
      return 6;
    } else if (difference(wires[4], segment).length > 0) {
      return 0;
    } else {
      return 9;
    }
  } else {
    // 2, 3, 5
    if (difference(wires[1], segment).length === 0) {
      return 3;
    } else if (difference(wires[4], segment).length === 1) {
      return 5;
    } else {
      return 2;
    }
  }
};

const findWiresForNumbers = (wireGuide: string[]): string[][] => {
  const wires: string[][] = Array(10).fill([]);

  while (wireGuide.length > 0) {
    const segment = wireGuide.shift().split("");

    const possibleDigits = digitSegments
      .filter((digit) => digit.length === segment.length)
      .map((digit) => digitSegments.indexOf(digit))
      .filter((digit) => wires[digit].length === 0);

    const digit = getDigit(segment, wires, possibleDigits);

    if (typeof digit !== "undefined") {
      wires[digit] = segment;
    } else {
      wireGuide.push(segment.join(""));
    }
  }

  return wires;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const segments = getTextFileLines(dirName, inputFile)
    .map((line) => line.split(" | ").pop())
    .map((segments) => segments.split(" "))
    .flat();

  const easySegments = segments.filter(
    (segment) =>
      countOccurrences(
        digitSegments.map((segment) => segment.length),
        segment.length
      ) === 1
  );

  return easySegments.length;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const lines = getTextFileLines(dirName, inputFile);

  let sum = 0;

  lines.forEach((line) => {
    let [wireGuide, segments] = line.split(" | ");

    const wiresForNumber = findWiresForNumbers(wireGuide.split(" "));

    const number = segments
      .split(" ")
      .map((segment) => {
        return wiresForNumber.find(
          (usedWires) =>
            usedWires.length === segment.length &&
            difference(usedWires, segment.split("")).length === 0
        );
      })
      .map((wiresInNumber) => wiresForNumber.indexOf(wiresInNumber));

    sum += parseInt(number.join(""), 10);
  });

  return sum;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
