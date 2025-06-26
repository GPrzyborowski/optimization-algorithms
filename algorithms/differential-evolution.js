let genotypeLength = 8
let populationSize = 100
let crossoverRate = 0.5
let mutationRate = 0.02
let numberOfEpochs = 1000

const f = (x, y) => {
    return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y;
}

const createGene = () => {
    return Math.random() < 0.5 ? 0 : 1
}

const createGenotype = () => {
    let genotype = []
    for(let i = 0; i < genotypeLength; i++) {
        genotype.push(createGene())
    }
    return genotype
}

const createIndividual = () => {
    let genotypeX = createGenotype()
    let genotypeY = createGenotype()
    let individual = genotypeX.concat(genotypeY)
    return individual
}

const binaryToDecimal = (individual) => {
    let sum = 0
    for(let i = 0; i < individual.length; i++) {
        if(individual[i] === 1) {
            sum += Math.pow(2, individual.length - 1 - i)
        }
    }
    return sum
}

const fitness = (individual) => {
    let binaryX = individual.slice(0, individual.length / 2)
    let binaryY = individual.slice(individual.length / 2)
    let x = binaryToDecimal(binaryX)
    let y = binaryToDecimal(binaryY)
    // scaling to range [-10, 10]
    x = -10 + (x / Math.pow(2, individual.length / 2)) * 20
    y = -10 + (y / Math.pow(2, individual.length / 2)) * 20
    let value = f(x, y)
    return value
}

const tournament = () => {
    let bestFitness = Infinity
    let bestIndividual
    for(let i = 0; i < 3; i++) {
        let randomIndividual = population[Math.floor(Math.random() * populationSize)]
        if(fitness(randomIndividual) < bestFitness) {
            bestIndividual = randomIndividual
            bestFitness = fitness(randomIndividual)
        }
    }
    return bestIndividual
}

const crossover = (parentA, parentB) => {
    let firstGenotypeA = parentA.slice(0, parentA.length / 2)
    let secondGenotypeA = parentA.slice(parentA.length / 2)
    let firstGenotypeB = parentB.slice(0, parentB.length / 2)
    let secondGenotypeB = parentB.slice(parentB.length / 2)
    let childA = firstGenotypeA.concat(secondGenotypeB)
    let childB = firstGenotypeB.concat(secondGenotypeA)
    return [childA, childB]
}

const mutate = (individual) => {
    for(let i = 0; i < individual.length; i++) {
        if(Math.random() < mutationRate) {
            individual[i] = individual[i] === 0 ? 1 : 0
        }
    }
    return individual
}

let population = []
for(let i = 0; i < populationSize; i++) {
    population.push(createIndividual())
}

for(let i = 0; i < numberOfEpochs; i++) {
    let newPopulation = []
    while(newPopulation.length < populationSize) {
        let parentA = tournament()
        let parentB = tournament()
        let childA = []
        let childB = []
        if(Math.random() < crossoverRate) {
            [childA, childB] = crossover(parentA, parentB)
        } else {
            childA = [...parentA]
            childB = [...parentB]
        }
        childA = mutate(childA)
        childB = mutate(childB)
        newPopulation.push(childA, childB)
    }
    population = newPopulation
    let bestIndividual = population.reduce((a, b) => (fitness(a) < fitness(b) ? a : b))
    console.log("Best individual found:", bestIndividual)
    console.log("Best objective function value:", fitness(bestIndividual))
}
