import { readFileSync } from "fs";
import { isArray } from "util";

export const readInputList = filename => {
  const moduleList = readFileSync(filename, "utf-8");
  const moduleArray = moduleList.split(",");
  let iModules = moduleArray.map(function(module) {
    return parseInt(module, 10);
  });
  return iModules;
};

const getValue = (instructions, position, paramCode, relBase) => {
  switch (paramCode) {
    case 0:
      return instructions[instructions[position]] || 0;
      break;
    case 1:
      return instructions[position] || 0;
      break;
    case 2:
      return instructions[instructions[position] + relBase] || 0;
      break;
  }
};

const getAddress = (instructions, position, paramCode, relBase) => {
  switch (paramCode) {
    case 0:
      return instructions[position] || 0;
      break;
    case 2:
      return instructions[position] + relBase || 0;
      break;
  }
};

const add = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  const sum = getAddress(instructions, position + 3, paramModes[2], relBase);
  instructions[sum] = first + second;
  return instructions;
};

const multiply = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  const product = getAddress(instructions, position + 3, paramModes[2], relBase);
  instructions[product] = first * second;
  return instructions;
};

const takeInput = (instructions, position, input, paramModes, relBase) => {
  let saveTo = getAddress(instructions, position + 1, paramModes[0], relBase);
  instructions[saveTo] = input;
  return instructions;
};

const giveOutput = (instructions, position, paramModes, relBase) => {
  let output = getValue(instructions, position + 1, paramModes[0], relBase);
  console.log(output);
  return [output, instructions];
};

const jumpIfTrue = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  if (first != 0) position = second;
  else position += 3;

  return { newSet: instructions, newPos: position };
};

const jumpIfFalse = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  if (first === 0) position = second;
  else position += 3;
  return { newSet2: instructions, newPos2: position };
};

const isLessThan = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  const third = getAddress(instructions, position + 3, paramModes[2], relBase);
  let value = 0;
  if (first < second) {
    value = 1;
  }
  instructions[third] = value;

  return instructions;
};

const isEquals = (instructions, position, paramModes, relBase) => {
  const first = getValue(instructions, position + 1, paramModes[0], relBase);
  const second = getValue(instructions, position + 2, paramModes[1], relBase);
  const third = getAddress(instructions, position + 3, paramModes[2], relBase);
  let value = 0;
  if (first === second) {
    value = 1;
  }
  instructions[third] = value;
  return instructions;
};

const adjustRelativeBase = (instructions, position, paramModes, relBase) => {
  const adjustVal = getValue(instructions, position + 1, paramModes[0], relBase);
  return adjustVal + relBase;
};

export const processInstructions = (state, input) => {
  if (!isArray(input)) {
    input = [input];
  }
  const size = state.instructions.length;
  let instructions = state.instructions;
  let output = [];
  let sent = 0;
  let final = state.output || 0;
  let position = state.position || 0;
  let opcode = "";
  let relBase = 0;

  while (opcode != 99) {
    let fullcode = instructions[position].toString().padStart(5, "0");
    opcode = Number(fullcode.slice(3));
    const param1Mode = Number(fullcode[2]);
    const param2Mode = Number(fullcode[1]);
    const param3Mode = Number(fullcode[0]);
    const params = [param1Mode, param2Mode, param3Mode];
    switch (opcode) {
      //add
      case 1:
        // console.log("adding");
        instructions = add(instructions, position, params, relBase);
        position += 4;
        break;
      //multiply
      case 2:
        // console.log("multiply");
        instructions = multiply(instructions, position, params, relBase);
        position += 4;
        break;
      //save
      case 3:
        // console.log("takeInput");
        instructions = takeInput(instructions, position, input.shift(), params, relBase);
        position += 2;
        break;
      //output
      case 4:
        // console.log("giveOutput");
        [sent, instructions] = giveOutput(instructions, position, params, relBase);
        output.push(sent);
        position += 2;
        // opcode = 99;
        break;
      case 5:
        // console.log("jumpIfTrue");
        let { newSet, newPos } = jumpIfTrue(instructions, position, params, relBase);
        instructions = newSet;
        position = newPos;
        break;
      case 6:
        // console.log("jumpifFalse");
        let { newSet2, newPos2 } = jumpIfFalse(instructions, position, params, relBase);
        instructions = newSet2;
        position = newPos2;
        break;
      case 7:
        // console.log("isLessThan");
        instructions = isLessThan(instructions, position, params, relBase);
        position += 4;
        break;
      case 8:
        // console.log("isEquals");
        instructions = isEquals(instructions, position, params, relBase);
        position += 4;
        break;
      case 9:
        // console.log("adjustRelativeBase");
        relBase = adjustRelativeBase(instructions, position, params, relBase);
        position += 2;
        break;
      //exit
      case 99:
        break;
      default:
        console.log(`Oh Snap! Encountered unknown opcode ${opcode}`);
        opcode = 99;
        break;
    }
  }
  return {
    instructions: [...instructions],
    position,
    output,
    final: output.join(",")
  };
  //   return output;
};
