import { first, last, range } from "lodash";
import { getTextFileLines } from "../utils/getInput";

type Rules = {
  [key: string]: string;
};

const countChars = (input: string): Record<string, number> => {
  return input.split("").reduce((total, letter) => {
    total[letter] ? total[letter]++ : (total[letter] = 1);
    return total;
  }, {});
};

const readFile = (dirName: string, inputFile: string): [string, Rules] => {
  const [template, _, ...pairString] = getTextFileLines(dirName, inputFile);
  const pairs: Rules = Object.fromEntries(
    pairString.map((pair) => pair.split(" -> ") as [string, string])
  );

  return [template, pairs];
};

const getPolymerQuality = (
  template: string,
  rules: Rules,
  interations: number
): number => {
  const charCount = countChars(template);

  let pairs = template.split("").reduce((total, letter, index, source) => {
    if (index === source.length - 1) return total;
    const pair = `${letter}${source[index + 1]}`;
    total[pair] = (total[pair] || 0) + 1;
    return total;
  }, {});

  range(0, interations).forEach((_) => {
    pairs = Object.entries(rules).reduce(
      (currPairs, [rulePair, ruleAdd]) => {
        if (!pairs[rulePair]) return currPairs;

        const count = pairs[rulePair];

        charCount[ruleAdd] = (charCount[ruleAdd] || 0) + count;

        currPairs[rulePair] = (currPairs[rulePair] || 0) - count;

        currPairs[`${rulePair[0]}${ruleAdd}`] =
          (currPairs[`${rulePair[0]}${ruleAdd}`] || 0) + count;
        currPairs[`${ruleAdd}${rulePair[1]}`] =
          (currPairs[`${ruleAdd}${rulePair[1]}`] || 0) + count;

        return currPairs;
      },
      { ...pairs }
    );
  });

  const counts = Object.values(charCount).sort((a, b) => b - a);

  return first(counts) - last(counts);
};

export const part1 = (dirName: string, inputFile: string): number => {
  const [template, rules] = readFile(dirName, inputFile);

  return getPolymerQuality(template, rules, 10);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const [template, rules] = readFile(dirName, inputFile);

  return getPolymerQuality(template, rules, 40);
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
