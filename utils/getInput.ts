import { readFileSync } from "fs";
import { resolve } from "path";

export const getInput = (dir: string) => getTextFile(dir, "input.txt");

export function getTextFileLines(dir: string, filename: string): string[];
export function getTextFileLines(
  dir: string,
  filename: string,
  format: "number"
): number[];
export function getTextFileLines(
  dir: string,
  filename: string,
  format?: "number"
) {
  const lines = getTextFile(dir, filename).split("\n");

  switch (format) {
    case "number":
      return lines.map((line) => parseInt(line, 10));

    default:
      return lines;
  }
}

export const getTextFile = (dir: string, filename: string) =>
  readFileSync(resolve(dir, filename)).toString();
