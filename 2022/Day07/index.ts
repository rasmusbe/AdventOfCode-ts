import { getTextFileLines } from "../utils/getInput";

const changeDirectory = (line: string, currentDirectory: string): string => {
  const newDirectory = line.split(" ")[2];

  if (newDirectory === "..") {
    return currentDirectory.split("/").slice(0, -1).join("/");
  } else if (newDirectory === "/") {
    return "/";
  }

  return `${currentDirectory}/${newDirectory}`.replace(/^\/\//, "/");
};

const getDirSizes = (input: string[]): { [key: string]: number } => {
  let currentDirectory = "/";
  const dirSizes: { [key: string]: number } = {};

  const cdRegex = /^\$ cd /;
  const sizeRegex = /^(\d+) /;

  for (const line of input) {
    if (cdRegex.test(line)) {
      currentDirectory = changeDirectory(line, currentDirectory);
    } else if (sizeRegex.test(line)) {
      const size = line.split(" ")[0];

      const dirParts = currentDirectory
        .split("/")
        .filter((part, i) => i === 0 || part !== ""); // Root becomes ["", ""]

      for (let i = 0; i < dirParts.length; i++) {
        const dirName = dirParts.slice(0, i + 1).join("/") || "/"; // Root is empty string
        dirSizes[dirName] = (dirSizes[dirName] ?? 0) + parseInt(size);
      }
    }
  }

  return dirSizes;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);
  const dirSizes = getDirSizes(input);

  return Object.values(dirSizes)
    .filter((size) => size < 100000)
    .reduce((acc, size) => acc + size, 0);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);
  const dirSizes = getDirSizes(input);

  const neededSpace = 30000000 - 70000000 + dirSizes["/"];

  const largeDirSizes = Object.values(dirSizes)
    .filter((size) => size >= neededSpace)
    .sort();

  return largeDirSizes[0];
};
