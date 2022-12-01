import { getTextFileLines } from "../utils/getInput";

const getElfCals = (input: string[]) : number[] => {
  let elf = 0;
  const elfCals: number[] = [];

  input.forEach((line) => {
        if (line.length > 0) {
      const cals = parseInt(line);

      elfCals[elf] = (elfCals[elf] || 0) + cals;
    } else {
      elf++;
    }
  });

  return elfCals;
}

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const elfCals = getElfCals(input);

  const max = Math.max(...elfCals);
  return max;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const elfCals = getElfCals(input);

  elfCals.sort((a, b) => b - a);

  const sum3 = elfCals[0] + elfCals[1] + elfCals[2];

  return sum3;
};