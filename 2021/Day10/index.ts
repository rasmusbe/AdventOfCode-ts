import { getTextFileLines } from "../utils/getInput";

const pairs = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const syntaxErrorScores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const autoCompleteScores = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const getSyntaxErrorScore = (chunk: string[]): number => {
  if (chunk.length === 0) {
    return 0;
  }

  const nextCloserPos = chunk.findIndex((char) => pairs[char] !== undefined);

  if (nextCloserPos === -1) {
    return 0;
  }

  if (
    nextCloserPos === 0 ||
    chunk[nextCloserPos - 1] !== pairs[chunk[nextCloserPos]]
  ) {
    return syntaxErrorScores[chunk[nextCloserPos]];
  }

  chunk = [
    ...chunk.slice(0, nextCloserPos - 1),
    ...chunk.slice(nextCloserPos + 1),
  ];

  return getSyntaxErrorScore(chunk);
};

const getUnclosed = (chunk: string[]): string[] => {
  if (chunk.length === 0) {
    return [];
  }

  const nextCloserPos = chunk.findIndex((char) => pairs[char] !== undefined);

  if (nextCloserPos === -1) {
    return chunk;
  }

  chunk = [
    ...chunk.slice(0, nextCloserPos - 1),
    ...chunk.slice(nextCloserPos + 1),
  ];

  return getUnclosed(chunk);
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const score = input.reduce((sum, line) => {
    return sum + getSyntaxErrorScore(line.split(""));
  }, 0);

  return score;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const correctLines = input.filter((line) => {
    return getSyntaxErrorScore(line.split("")) === 0;
  });

  const scores: number[] = correctLines
    .map((line) => {
      return getUnclosed(line.split(""))
        .reverse()
        .reduce((sum, char) => {
          return sum * 5 + autoCompleteScores[char];
        }, 0);
    })
    .sort((a, b) => b - a);

  return scores[Math.round(scores.length / 2) - 1];
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
