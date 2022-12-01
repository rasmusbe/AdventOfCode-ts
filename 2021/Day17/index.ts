import { getTextFile } from "../utils/getInput";

type Position = {
  x: number;
  y: number;
};
type Velocity = {
  x: number;
  y: number;
};

type TargetArea = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const parseArea = (str: string): TargetArea => {
  const m = /x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/.exec(str);

  return {
    xMin: parseInt(m[1], 10),
    xMax: parseInt(m[2], 10),
    yMin: parseInt(m[3], 10),
    yMax: parseInt(m[4], 10),
  }
};

const didOvershoot = (pos: Position, target: TargetArea): boolean => {
  return pos.x > target.xMax;
}

const didUndershoot = (pos: Position, target: TargetArea): boolean => {
  return pos.y < target.yMin;
}

const inArea = (pos: Position, target: TargetArea): boolean => {
  return pos.x >= target.xMin && pos.x <= target.xMax && pos.y >= target.yMin && pos.y <= target.yMax;
}

const move = (pos: Position, vel: Velocity) => {
  pos.x += vel.x;
  pos.y += vel.y;

  vel.x = vel.x + (vel.x === 0 ? 0 : vel.x > 0 ? -1 : 1);
  vel.y -= 1;
};

export const part1 = (dirName: string, inputFile: string): [number, number] => {
  const input = getTextFile(dirName, inputFile);
  const target = parseArea(input);

  let maxY = 0;
  let velocities = [];

  for(let velX = 0; velX <= target.xMax; velX++) {
    for(let velY = target.yMin; velY < 200; velY++) {
      const pos: Position = { x: 0, y: 0 };
      const vel: Velocity = { x: velX, y: velY };
      let currMaxY = 0;
      while (!didOvershoot(pos, target) && !didUndershoot(pos, target)) {
        currMaxY = Math.max(currMaxY, pos.y);
        if (inArea(pos, target)) {
          maxY = Math.max(maxY, currMaxY);
          velocities.push([velX, velY]);
          break;
        }

        move(pos, vel);
      }
    }
  }

  return [maxY, velocities.length];
};
