import { processInstructions, readInputList } from "./intcode.mjs";

const initialState = {
  instructions: readInputList("puzzleinput.txt"),
  position: 0
};
const finalOutput = processInstructions(initialState, [2]);
console.log(finalOutput.final);
