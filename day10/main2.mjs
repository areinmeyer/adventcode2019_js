import { destroyTargets, findAsteroids, getTargets, processMap } from "./asteroids2.mjs";

const asteroids = destroyTargets(getTargets(findAsteroids(processMap("puzzleinput.txt")), { x: 26, y: 29 }));
// const asteroids = destroyTargets(getTargets(findAsteroids(processMap("testinput5.txt")), { x: 11, y: 13 }));
console.dir(asteroids);
