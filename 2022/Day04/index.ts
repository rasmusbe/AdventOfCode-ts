import { getTextFileLines } from "../utils/getInput";

const getElfPairs = (line: string): number[][] =>
  line.split(",").map((elf) => elf.split("-").map(Number));

const getSections = (start: number, end: number): number[] =>
  Array.from(Array(end - start + 1).keys()).map((i) => i + start);

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const fullContains = input.filter((line) => {
    const [elf1, elf2] = getElfPairs(line);

    const fullContained =
      (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) ||
      (elf2[0] <= elf1[0] && elf2[1] >= elf1[1]);

    return fullContained;
  });

  return fullContains.length;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const overlaps = input.reduce((acc, line) => {
    const [elf1, elf2] = getElfPairs(line);

    const elf1Sections = getSections(elf1[0], elf1[1]);
    const elf2Sections = getSections(elf2[0], elf2[1]);

    const overlap = elf1Sections.filter((section) =>
      elf2Sections.includes(section)
    );

    return acc + (overlap.length > 0 ? 1 : 0);
  }, 0);

  return overlaps;
};
