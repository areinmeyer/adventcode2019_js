import { readFileSync } from 'fs'

const buildWire = (wire) => {
    const wireList = new Map()
    const position = { x: 0, y: 0}
    let steps = 0

    for (let i = 0; i < wire.length; i++) {
        const direction = wire[i][0]
        const value = wire[i].slice(1)
        const spotsToMove = parseInt(value)
        for (let j = 1; j <= spotsToMove; j++) {
            if (direction === 'R') {
                position.x += 1
            }
            if (direction === 'L') {
                position.x -= 1
            }
            if (direction === 'U') {
                position.y += 1
            }
            if (direction === 'D') {
                position.y -= 1
            }

            wireList.set(`${position.x}, ${position.y}`, ++steps)
        }
    }

    return wireList
}

export const buildWires = (wires) => {
    return wires.map(buildWire)
}

export const compareWires = ([wire1, wire2]) => {

    const wire1positions = [...wire1.entries()]
    const matches = wire1positions.filter(([position]) => {
        return wire2.has(position)
    })
    .map(([position, steps]) => {
        return { position, steps: steps + wire2.get(position)}
    })
    console.log(matches)
    matches.sort(findBest)
    console.log(matches)
    return matches[0]
}

const findBest = (best, point) => {
    return best.steps - point.steps
}

export const readInputList = () => {
    const wireList = readFileSync('puzzleInput.txt', 'utf-8')
    // const wireList = readFileSync('testinput.txt', 'utf-8')
    const wires = wireList.split('\n')
    let wireArray = wires.map(function (wire) {
        return wire.split(',')
    })
    return wireArray
}