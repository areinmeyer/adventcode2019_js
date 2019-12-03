import { readFileSync } from 'fs'

/*
    The mass param is determined by
    mass divided by 3, rounded down and subtracting 2
    We must also recursively account for the weight of the fuel as a new mass.
    Once we reach negative values, we can safely ignore that last amount of fuel (elven magic!)
*/
const fuelForModule = (mass) => {
    const fuel = Math.floor(parseInt(mass, 10) / 3) - 2
    console.log(`The fuel for ${mass} is ${fuel}`)
    return fuel < 0 ? 0 : fuel + fuelForModule(fuel)
}

/*
    Reducer function.  Take each module mass and calculate fuel cost
*/
const sumModules = (total =0, module = 0) => {
    const fuel = total + fuelForModule(module)
    console.log(`running total: ${fuel}`)
    return fuel
}

/*
    For a given array, call the sumModules reducer.
    This will handle calculating and summing based on the mass of each module.
*/
export const processModules = (modules) => {
    const totalFuel = modules.reduce(sumModules, 0)
    return totalFuel
}

/*
    Read the puzzleInput as a string then split it into an array
    Create a new array converting the strings to ints.
    A more robust version would make sure the parseInt function doesn't blow up
    Also could parameterize the filename
*/
export const readModuleList = () => {
    // const moduleList = fs.readFileSync('fuel.txt', 'utf-8')
    const moduleList = readFileSync('puzzleInput.txt', 'utf-8')
    const moduleArray = moduleList.split('\n')
    const iModules = moduleArray.map(function (module) {
        return parseInt(module, 10)
    })
    console.log(iModules)
    return iModules
}
