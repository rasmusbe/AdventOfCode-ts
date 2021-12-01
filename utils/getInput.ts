import * as fs from "fs";
import * as path from "path";

export const getInput = (dir: string) => getTextFile(dir, "input.txt");

export const getTextFile = (dir: string, filename: string) =>
  fs.readFileSync(path.resolve(dir, filename)).toString();
