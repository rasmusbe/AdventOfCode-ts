import { getTextFileLines } from "../utils/getInput";

const priorities = [
  ...Array.from(Array(26).keys()).map((i) => String.fromCharCode(i + 97)), // a-z
  ...Array.from(Array(26).keys()).map((i) => String.fromCharCode(i + 65)), // A-Z
];

const findSharedItem = (arr1: string[], arr2: string[]): string =>
  arr1.find((item) => arr2.includes(item));

const findSharedBadge = (
  arr1: string[],
  arr2: string[],
  arr3: string[]
): string => arr1.find((item) => arr2.includes(item) && arr3.includes(item));

const getPriority = (item: string) => priorities.indexOf(item) + 1;

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  let sum = 0;

  for (const line of input) {
    const part2 = line.split("");
    const part1 = part2.splice(0, part2.length / 2);

    const sharedItem = findSharedItem(part1, part2);

    sum = sum + getPriority(sharedItem);
  }

  return sum;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  let sum = 0;
  for (let group = 0; group < input.length; group += 3) {
    const part1 = input[group].split("");
    const part2 = input[group + 1].split("");
    const part3 = input[group + 2].split("");

    const sharedBadge = findSharedBadge(part1, part2, part3);

    sum = sum + getPriority(sharedBadge);
  }

  return sum;
};
