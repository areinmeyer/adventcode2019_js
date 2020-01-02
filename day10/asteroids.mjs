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

export const getLineOfSight = asteroids => {
  return asteroids.map(asteroid => {
    const angleThetas = new Set();
    const { x, y } = asteroid;

    asteroids.forEach(({ x: x2, y: y2 }) => {
      if (!(x === x2 && y === y2)) {
        angleThetas.add(Math.atan2(y2 - y, x2 - x));
      }
    });
    return {
      x,
      y,
      count: angleThetas.size
    };
  });
};
