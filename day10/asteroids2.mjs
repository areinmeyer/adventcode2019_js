// Hat tip to https://github.com/mariotacke/advent-of-code-2019 for solution help
import { readFileSync } from "fs";

export const processMap = filename => {
  const file = readFileSync(filename, "utf-8");
  const rows = file.split("\n");
  const map = rows.map(row => {
    return row.split("");
  });
  return map;
};

export const findAsteroids = map => {
  return map.reduce((asteroids, row, y) => {
    row.map((val, x) => {
      if (val === "#") {
        asteroids.push({ x, y });
      }
    });
    return asteroids;
  }, []);
};

export const getTargets = (asteroids, station) => {
  const { x: x1, y: y1 } = station;
  return asteroids.reduce((targets, asteroid) => {
    const { x: x2, y: y2 } = asteroid;

    if (!(x1 === x2 && y1 === y2)) {
      targets.push({
        x: x2,
        y: y2,
        degrees: Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI),
        distance: Math.hypot(x1 - x2, y1 - y2)
      });
    }
    return targets;
  }, []);
};

export const destroyTargets = targets => {
  targets = targets.sort((a, b) => a.degrees - b.degrees);
  let blasted = 0;
  const distinctDegrees = new Set();

  targets.map(target => {
    distinctDegrees.add(target.degrees);
    return target;
  });
  const visibleTargets = [...distinctDegrees];
  let degreeIndex = visibleTargets.findIndex(degrees => degrees === -90);
  let target200 = {};

  while (targets.length) {
    const toDestroy = targets
      .filter(target => {
        return target.degrees === visibleTargets[degreeIndex];
      })
      .sort((a, b) => a.distance - b.distance)[0];

    if (toDestroy) {
      targets = targets.filter(({ x, y }) => {
        if (x === toDestroy.x && y === toDestroy.y) {
          blasted++;
          console.log(`Blasting ${x}, ${y}!!! That's ${blasted} destroyed!`);
          if (blasted == 200) target200 = { x, y };
          return false;
        }
        return true;
      });
    }
    degreeIndex = degreeIndex < visibleTargets.length ? degreeIndex + 1 : 0;
  }
  return target200.x * 100 + target200.y;
};
