import { readInputList, processInstructions } from "./intcode.mjs";

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
  const permutations = permutator([4, 3, 2, 1, 0]);
  const instructions = readInputList("puzzleinput.txt");
  return permutations
    .map(permutation => {
      let output = 0;
      return permutation
        .map(input => {
          output = processInstructions(instructions, [input, output]);
          return output;
        })
        .reduce(findMax);
    })
    .reduce(findMax);
};
console.dir(processAmplifyCode());
