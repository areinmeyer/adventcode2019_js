import { readFileSync } from "fs";
import { isArray } from "util";

const add = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  const sum = instructions[position + 3];
  instructions[sum] = first + second;
  return instructions;
};

const multiply = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  const product = instructions[position + 3];
  instructions[product] = first * second;
  return instructions;
};

const jumpIfTrue = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  if (first != 0) position = second;
  else position += 3;

  return { newSet: instructions, newPos: position };
};

const jumpIfFalse = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  if (first === 0) position = second;
  else position += 3;

  return { newSet2: instructions, newPos2: position };
};

const isLessThan = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  const third = instructions[position + 3];
  let value = 0;
  if (first < second) {
    value = 1;
  }
  instructions[third] = value;

  return instructions;
};

const isEquals = (instructions, position, paramModes) => {
  const first = getParameter(instructions, position + 1, paramModes[0]);
  const second = getParameter(instructions, position + 2, paramModes[1]);
  const third = instructions[position + 3];
  let value = 0;
  if (first === second) {
    value = 1;
  }
  instructions[third] = value;

  return instructions;
};

const takeInput = (instructions, position, input) => {
  const saveTo = instructions[position + 1];
  instructions[saveTo] = input;
  return instructions;
};

const giveOutput = (instructions, position, paramModes) => {
  const output = getParameter(instructions, position + 1, paramModes[0]);
  return [output, instructions];
};

const getParameter = (instructions, position, paramCode) => {
  if (paramCode === 1) {
    return instructions[position];
  } else {
    return instructions[instructions[position]];
  }
};

export const readInputList = filename => {
  const moduleList = readFileSync(filename, "utf-8");
  const moduleArray = moduleList.split(",");
  let iModules = moduleArray.map(function(module) {
    return parseInt(module, 10);
  });
  return iModules;
};

export const processInstructions = (state, input) => {
  if (!isArray(input)) {
    input = [input];
  }
  const size = state.instructions.length;
  let instructions = state.instructions;
  let output = 0;
  let final = state.output || 0;
  let position = state.position || 0;
  let opcode = "";

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
        instructions = add(instructions, position, params);
        position += 4;
        break;
      //multiply
      case 2:
        instructions = multiply(instructions, position, params);
        position += 4;
        break;
      //save
      case 3:
        instructions = takeInput(instructions, position, input.shift());
        position += 2;
        break;
      //output
      case 4:
        [output, instructions] = giveOutput(instructions, position, params);
        position += 2;
        opcode = 99;
        final = output;
        break;
      case 5:
        let { newSet, newPos } = jumpIfTrue(instructions, position, params);
        instructions = newSet;
        position = newPos;
        break;
      case 6:
        let { newSet2, newPos2 } = jumpIfFalse(instructions, position, params);
        instructions = newSet2;
        position = newPos2;
        break;
      case 7:
        instructions = isLessThan(instructions, position, params);
        position += 4;
        break;
      case 8:
        instructions = isEquals(instructions, position, params);
        position += 4;
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
    final
  };
  //   return output;
};
