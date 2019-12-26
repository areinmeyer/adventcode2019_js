import { readFileSync } from 'fs'

const add = (instructions, position, paramModes) => {
    const first = getParameter(instructions, position + 1, paramModes[0])
    const second = getParameter(instructions, position + 2, paramModes[1])
    const sum = instructions[position + 3]
    // console.log(`adding ${first} + ${second} and putting it in ${sum}`)
    instructions[sum] = first + second
    return instructions
}

const multiply = (instructions, position, paramModes) => {
    const first = getParameter(instructions, position + 1, paramModes[0])
    const second = getParameter(instructions, position + 2, paramModes[1])
    const product = instructions[position + 3]
    // console.log(`multiplying ${first} * ${second} and putting it in ${product}`)
    instructions[product] = first * second
    return instructions
}

export const readInputList = () => {
    // const moduleList = readFileSync('testinput.txt', 'utf-8')
    const moduleList = readFileSync('puzzleinput.txt', 'utf-8')
    const moduleArray = moduleList.split(',')
    let iModules = moduleArray.map(function (module) {
        return parseInt(module, 10)
    })
    return iModules
}

export const takeInput = (instructions, position, input) => {
        const saveTo = instructions[position + 1]
        instructions[saveTo] = input
        // console.log(`Saving ${input} to position ${saveTo}`)
        return instructions
}

const giveOutput = (instructions, position) => {
    const outPosition = instructions[position + 1]
    console.log(`Generating output at postion ${outPosition}: ${instructions[outPosition]}`)
    return instructions
}

const getParameter = (instructions, position, paramCode) => {

    // console.log(`determining param for ${position} with code ${paramCode}`)
    if (paramCode === 1) {
        // console.log(instructions[position])
        return instructions[position]
    }
    else {
        // console.log(instructions[instructions[position]])
        return instructions[instructions[position]]
    }
}

export const processInstructions = (instructions, input) => {

    const size = instructions.length
    let position = 0
    let opcode = ""
    while (opcode != 99) {
        // console.log(`processing position ${position} ${instructions[position]}`)
        let fullcode = instructions[position].toString().padStart(5,'0')
        opcode = Number(fullcode.slice(3))
        const param1Mode = Number(fullcode[2])
        const param2Mode = Number(fullcode[1])
        const param3Mode = Number(fullcode[0])
        const params = [param1Mode, param2Mode, param3Mode]
        switch (opcode) {
            //add
            case 1:
                // console.log("adding")
                instructions = add(instructions, position, params)
                position += 4
                break;
            //multiply
            case 2:
                // console.log("multiplying")
                instructions = multiply(instructions, position, params)
                position += 4
                break;
            //save
            case 3:
                // console.log("saving input")
                instructions = takeInput(instructions, position, input)
                position += 2
                break;
            //output
            case 4:
                // console.log("output")
                instructions = giveOutput(instructions, position)
                position += 2
                break;
            //exit
            case 99:
                console.log("end")
                position = instructions.length + 1
                break;
            default:
                console.log(`Oh Snap! Encountered unknown opcode ${opcode}`)
                opcode = 99
                break;
        }
        // console.log("Now ", instructions)
    }
    // console.log(instructions)
}
/*
    TODO:
    flesh out input/output
    change step from 4 to variable
    add logic to parse out 4 digit intcode
    add logic to handle param logic
*/