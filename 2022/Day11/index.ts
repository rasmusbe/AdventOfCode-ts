import { getTextFile } from "../utils/getInput";

class Monkey {
  ID: string;
  items: number[];
  operator: string;
  operationProduct: number | "old";
  division: number;
  onTrue: number;
  onFalse: number;

  inspectTimes = 0;

  constructor(input: string) {
    const lines = input.split("\n").map((line) => line.trim());

    this.ID = lines[0].match(/(\d+)/g)[0];
    this.items = lines[1].match(/(\d+)/g).map(Number);
    this.operator = lines[2].match(/([\+\*])/g)[0];

    let product = lines[2].match(/(\d+|old)$/g)[0];
    if (product === "old") {
      this.operationProduct = "old";
    } else {
      this.operationProduct = parseInt(product);
    }

    this.division = parseInt(lines[3].match(/(\d+)/g)[0]);
    this.onTrue = parseInt(lines[4].match(/(\d+)/g)[0]);
    this.onFalse = parseInt(lines[5].match(/(\d+)/g)[0]);
  }

  addItem(item: number) {
    this.items.push(item);
  }

  process(manageableLvl?: number): [number, number][] | undefined {
    let worryLevel: number;
    const throws = [];
    while ((worryLevel = this.items.shift())) {
      if (worryLevel === undefined) {
        break;
      }

      this.inspectTimes++;

      let operationProduct =
        this.operationProduct === "old" ? worryLevel : this.operationProduct;

      switch (this.operator) {
        case "+":
          worryLevel += operationProduct;
          break;
        case "*":
          worryLevel *= operationProduct;
          break;
      }

      if (manageableLvl === undefined) {
        worryLevel = Math.floor(worryLevel / 3);
      } else {
        worryLevel = worryLevel % manageableLvl;
      }

      if (worryLevel % this.division === 0) {
        throws.push([worryLevel, this.onTrue]);
      } else {
        throws.push([worryLevel, this.onFalse]);
      }
    }

    return throws;
  }
}

const getMonkeys = (input: string): Monkey[] => {
  const monkeyInputs = input.split("Monkey").filter(Boolean);

  const monkeys: Monkey[] = [];
  for (const monkeyInput of monkeyInputs) {
    monkeys.push(new Monkey(monkeyInput));
  }

  return monkeys;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFile(dirName, inputFile);

  const monkeys = getMonkeys(input);

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      const throws = monkey.process();
      for (const throwing of throws) {
        const [item, nextMonkeyID] = throwing;
        monkeys[nextMonkeyID].addItem(item);
      }
    }
  }

  const inspectTimes = monkeys
    .map((monkey) => monkey.inspectTimes)
    .sort((a, b) => b - a);

  return inspectTimes[0] * inspectTimes[1];
};

// great-common divisor of 2 numbers
const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
// least common multiple of 2 numbers
const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFile(dirName, inputFile);

  const monkeys = getMonkeys(input);

  const manageableLvl = monkeys.map((monkey) => monkey.division).reduce(lcm);

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      const throws = monkey.process(manageableLvl);
      for (const throwing of throws) {
        const [item, nextMonkeyID] = throwing;
        monkeys[nextMonkeyID].addItem(item);
      }
    }
  }

  const inspectTimes = monkeys
    .map((monkey) => monkey.inspectTimes)
    .sort((a, b) => b - a);

  return inspectTimes[0] * inspectTimes[1];
};
