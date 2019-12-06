import {readFileSync} from 'fs'

const add = (instructions, position) => {
    const first = instructions[position + 1]
    const second = instructions[position + 2]
    const sum = instructions[position + 3]
    instructions[sum] = instructions[first] + instructions[second]
    return instructions
}

const multiply = (instructions, position) => {
    const first = instructions[position + 1]
    const second = instructions[position + 2]
    const product = instructions[position + 3]
    instructions[product] = instructions[first] * instructions[second]
    return instructions
}

export const readInputList = () => {
    const moduleList = readFileSync('day2input.txt', 'utf-8')
    const moduleArray = moduleList.split(',')
    let iModules = moduleArray.map(function (module) {
        return parseInt(module, 10)
    })
    return iModules
}

export const processInstructions = (instructions) => {
    const size = instructions.length
    let workinglist = instructions
    for (let noun = 0; noun <= 99; noun++) {
        for (let verb = 0; verb <= 99; verb++) {
            workinglist = [...instructions]
            workinglist[1] = noun
            workinglist[2] = verb

            processLoop:
            for (let position = 0; position < size; position+=4) {
                const opcode = workinglist[position]
                switch (opcode) {
                    //add
                    case 1:
                        workinglist = add(workinglist, position)
                        break;
                    //multiply
                    case 2:
                        workinglist = multiply(workinglist, position)
                        break;
                    //exit
                    case 99:
                        position = size + 1
                        break processLoop;
                    default:
                        console.log(`Oh Snap! Encountered unknown opcode ${opcode}`)
                        break processLoop;
                }
            }

            if (workinglist[0] === 19690720) {
                console.log(`Found pair! noun: ${noun} and verb: ${verb} that equals ${100 * noun + verb}`)
                return 100 * noun + verb
            }
        }
    }

}
