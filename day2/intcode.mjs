import {readFileSync} from 'fs'

const add = (instructions, position) => {
    const first = instructions[position + 1]
    const second = instructions[position + 2]
    const sum = instructions[position + 3]
    console.log(`adding ${instructions[first]} + ${instructions[second]}`)
    instructions[sum] = instructions[first] + instructions[second]
    return instructions
}

const multiply = (instructions, position) => {
    const first = instructions[position + 1]
    const second = instructions[position + 2]
    const product = instructions[position + 3]
    console.log(`multiplying ${instructions[first]} * ${instructions[second]}`)
    instructions[product] = instructions[first] * instructions[second]
    return instructions
}

const restoreGravityAssist = (instructions) => {
    instructions[1] = 12
    instructions[2] = 2
    return instructions
}

export const readInputList = () => {
    // const moduleList = fs.readFileSync('fuel.txt', 'utf-8')
    const moduleList = readFileSync('day2input.txt', 'utf-8')
    const moduleArray = moduleList.split(',')
    let iModules = moduleArray.map(function (module) {
        return parseInt(module, 10)
    })
    console.log(iModules)
    iModules = restoreGravityAssist(iModules)
    return iModules
}

export const processInstructions = (instructions) => {
    const size = instructions.length
    for (let position = 0; position < size; position+=4) {
        console.log(`processing position ${position}`)
        const opcode = instructions[position]
        switch (opcode) {
            //add
            case 1:
                console.log("adding")
                instructions = add(instructions, position)
                break;
            //multiply
            case 2:
                console.log("multiplying")
                instructions = multiply(instructions, position)
                break;
            //exit
            case 99:
                console.log("end")
                position = instructions.length + 1
                break;
            default:
                console.log(`Oh Snap! Encountered unknown opcode ${opcode}`)
                exit
                break;
        }
        console.log("Now ", instructions)
    }
    console.log(instructions)
}
/*
    Business logic:
    Find opcode in instructions (1st, 5th, 9th, etc.)
    Determine what the opcode says
    execute instruction
    update list
    repeat
*/