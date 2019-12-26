import { readFileSync } from "fs";

export const readInputList = () => {
  //   const moduleList = readFileSync("testinput1.txt", "utf-8");
  const moduleList = readFileSync("puzzleinput.txt", "utf-8");
  const moduleArray = moduleList.split("\n");

  return moduleArray;
};

export const buildMap = input => {
  const orbitMap = {};
  input.map(orbit => {
    const [body1, body2] = orbit.split(")");
    orbitMap[body2] = body1;
  });

  return orbitMap;
};

const bodyHasOrbit = (body, orbitMap) => {
  return orbitMap[body];
};

export const countOrbits = orbitMap => {
  let counter = 0;
  let bodies = Object.keys(orbitMap);
  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];

    while (bodyHasOrbit(body, orbitMap)) {
      counter++;
      body = orbitMap[body];
    }
  }

  return counter;
};
