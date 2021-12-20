import { range } from "lodash";
import { getTextFileLines } from "../utils/getInput";
import { cartesian, windows } from "../utils/utils";

// Value and depth
type SFNumber = [number, number][];

const buildSFNumber = (line: string): SFNumber => {
  const n: SFNumber = [];
  let lvl = 0;
  for (const c of line) {
    if (c === "[") lvl += 1;
    else if (c === "]") lvl -= 1;
    else if (c === ",") continue;
    else n.push([parseInt(c), lvl]);
  }
  return n;
};

const add = (n1: SFNumber, n2: SFNumber): SFNumber => [
  ...(n1.map(([v1, lvl1]) => [v1, lvl1 + 1]) as SFNumber),
  ...(n2.map(([v2, lvl2]) => [v2, lvl2 + 1]) as SFNumber),
];

const explode = (n: SFNumber): boolean => {
  const i = windows(n, 2).findIndex(
    ([[_v1, lvl1], [_v2, lvl2]]) => lvl1 === lvl2 && lvl1 > 4
  );
  if (i === -1) return false;
  if (n[i - 1]) n[i - 1][0] += n[i][0];
  if (n[i + 2]) n[i + 2][0] += n[i + 1][0];
  n.splice(i, 2, [0, 4]);
  return true;
};

const split = (n: SFNumber): boolean => {
  const i = n.findIndex(([value, level]) => value >= 10);
  if (i === -1) return false;
  n.splice(
    i,
    1,
    [Math.floor(n[i][0] / 2), n[i][1] + 1],
    [Math.ceil(n[i][0] / 2), n[i][1] + 1]
  );
  return true;
};

const reduce = (n: SFNumber): SFNumber => {
  while (true) {
    if (explode(n)) continue;
    if (split(n)) continue;
    return n;
  }
};

const magnitude = (n: SFNumber): number => {
  while (n.length > 1) {
    const i = windows(n, 2).findIndex(
      ([[v1, lvl1], [v2, lvl2]]) => lvl1 === lvl2
    );
    const v = 3 * n[i][0] + 2 * n[i + 1][0];
    n.splice(i, 2, [v, n[i][1] - 1]);
  }
  return n[0][0];
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const depths = input.map((line) => reduce(buildSFNumber(line)));

  const num = depths
    .slice(2)
    .reduce(
      (sum: SFNumber, n: SFNumber) => reduce(add(sum, n)),
      reduce(add(depths[0], depths[1]))
    );

  return magnitude(num);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  const depths = input.map((line) => reduce(buildSFNumber(line)));

  const magnitudes = cartesian(range(0, depths.length), range(0, depths.length))
    .filter(([i, j]) => i !== j)
    .map(([i, j]) => magnitude(reduce(add(depths[i], depths[j]))));

  return Math.max(...magnitudes);
};

// const magnitudes = cartesian(range(depths.length), range(depths.length))
//     .filter(([i, j]) => i !== j)
//     .map(([i, j]) => magnitude(reduce(add(depths[i], depths[j]))));
// console.log("Part2:", Math.max(...magnitudes));
