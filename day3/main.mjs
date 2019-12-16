import { buildWires, compareWires, getClosest, readInputList } from './wirespart1.mjs'

const bestPoint = getClosest(compareWires(buildWires(readInputList())))
console.log(`The Manhattan Distance is ${bestPoint.value} for ${bestPoint.point}`)