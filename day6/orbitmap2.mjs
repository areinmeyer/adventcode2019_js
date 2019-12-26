import { readFileSync } from "fs";

export const readInputList = () => {
  //   const moduleList = readFileSync("testinput2.txt", "utf-8");
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

const getVisited = (body, orbitMap) => {
  let bodies = Object.keys(orbitMap);
  let currBody = body;
  const orbits = [];
  while (currBody != "COM") {
    currBody = orbitMap[currBody];

    orbits.push(currBody);
  }
  return orbits;
};

export const countOrbits = orbitMap => {
  let body1 = orbitMap["YOU"];
  let body2 = orbitMap["SAN"];

  const youOrbits = getVisited(body1, orbitMap);
  const sanOrbits = getVisited(body2, orbitMap);

  for (let i = 0; i < youOrbits.length; i++) {
    let body = youOrbits[i];
    const bodyMatches = test => body === test;
    let j = sanOrbits.findIndex(bodyMatches);
    if (j != -1) {
      return i + j + 2;
    }
  }
};
