import { readInputList, processInstructions, takeInput } from './intcode.mjs'
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please provide input: ', (answer) => {
    answer = parseInt(answer)
    processInstructions(readInputList(), answer)
    rl.close();
});
