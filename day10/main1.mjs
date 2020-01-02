import { findAsteroids, getLineOfSight, processMap } from "./asteroids.mjs";

const asteroids = getLineOfSight(findAsteroids(processMap("puzzleinput.txt")));
console.log(
  asteroids.reduce((mostVisible, asteroid) => {
    return mostVisible.count > asteroid.count ? mostVisible : asteroid;
  })
);
