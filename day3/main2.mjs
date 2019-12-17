import { buildWires, compareWires, readInputList } from './wirespart2.mjs'

const bestPoint = compareWires(buildWires(readInputList()))
console.log(`The Manhattan Distance is ${bestPoint.steps} for ${bestPoint.position}`)