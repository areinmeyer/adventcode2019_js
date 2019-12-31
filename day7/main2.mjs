import { readInputList, processInstructions } from "./intcode2.mjs";

const permutator = inputArr => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);
  return result;
};

const findMax = (max, val) => {
  return val < max ? max : val;
};

const processAmplifyCode = arr => {
  const permutations = permutator([5, 6, 7, 8, 9]);
  const instructions = readInputList("puzzleinput.txt");
  return permutations
    .map(permutation => {
      let initialState = {
        instructions,
        position: 0
      };
      let amplifierA = processInstructions(initialState, [permutation[0], 0]);
      let amplifierB = processInstructions(initialState, [permutation[1], amplifierA.output]);
      let amplifierC = processInstructions(initialState, [permutation[2], amplifierB.output]);
      let amplifierD = processInstructions(initialState, [permutation[3], amplifierC.output]);
      let amplifierE = processInstructions(initialState, [permutation[4], amplifierD.output]);

      while (amplifierE.instructions[amplifierE.position] != 99) {
        amplifierA = processInstructions(amplifierA, [amplifierE.output]);
        amplifierB = processInstructions(amplifierB, [amplifierA.output]);
        amplifierC = processInstructions(amplifierC, [amplifierB.output]);
        amplifierD = processInstructions(amplifierD, [amplifierC.output]);
        amplifierE = processInstructions(amplifierE, [amplifierD.output]);
      }
      return amplifierE.final;
    })
    .reduce(findMax);
};
console.dir(processAmplifyCode());
