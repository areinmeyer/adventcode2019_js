import { readFileSync } from 'fs'
import { isArray } from 'util'

const increment = (direction, spotsToMove, wirePoints) => {

    const startPoint = wirePoints[wirePoints.length - 1]
    const startX = parseInt(startPoint[0])
    const startY = parseInt(startPoint[1])
    if (direction === 'R') {
        for (let r = 1; r <= spotsToMove; r++) {
            wirePoints.push([startX + r, startY])
        }
    }
    if (direction === 'L') {
        for (let l = 1; l <= spotsToMove; l++) {
            wirePoints.push([startX - l, startY])
        }
    }
    if (direction === 'U') {
        for (let u = 1; u <= spotsToMove; u++) {
            wirePoints.push([startX, startY + u])
        }
    }
    if (direction === 'D') {
        for (let d = 1; d <= spotsToMove; d++) {
            wirePoints.push([startX, startY - d])
        }
    }

    return wirePoints
}

const buildWire = (wire) => {
    let wireList = [
        [0,0]
    ]
    wire.flatMap(dirAndLength => {
        const direction = dirAndLength[0]
        const spotsToMove = dirAndLength.slice(1)
        increment(direction, spotsToMove, wireList)
    })
    return wireList
}

export const buildWires = (wires) => {
    return wires.map(buildWire)
}

export const compareWires = ([wire1, wire2]) => {
    const matchingPoints = []
    wire1.filter(point1 => {
        const doesit = wire2.filter(point2 => {
            const point1match = point1[0] === point2[0]
            const point2match = point1[1] === point2[1]
            if (point1match && point2match && point1[0] != 0 && point1[1] != 0) {
                return true
            }
            return false
        })
        if (isArray(doesit)) {
            matchingPoints.push(...doesit)
            return true
        }
        return false
    })
    return matchingPoints
}

const findBest = (best, point) => {
    return (best.value < point.value) ? best : point
}

export const getClosest = (matchingPoints) => {
    let xList = matchingPoints.map(point => {
        return {
            value: Math.abs(point[0]) + Math.abs(point[1]),
            point: point
        }
    })
    return xList.reduce(findBest)
}

export const readInputList = () => {
    // const wireList = readFileSync('puzzleInput.txt', 'utf-8')
    const wireList = readFileSync('testinput.txt', 'utf-8')
    const wires = wireList.split('\n')
    let wireArray = wires.map(function (wire) {
        return wire.split(',')
    })
    return wireArray
}