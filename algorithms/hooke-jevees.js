let step = 1
let minStep = 0.01
let point = [100, 100]
let stepReductionFactor = 0.95
let stepIncreaseFactor = 1.25

const f = (x, y) => {
    return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y;
}

let basePoint = [...point]
let bestFunctionValue = f(...point)

while(step > minStep) {
    let testPoint = [...point]
    let stepMade = false
    for(let i = 0; i < 2; i++) {
        testPoint[i] += step
        if(f(...testPoint) < f(...point)) {
            point = [...testPoint]
            bestFunctionValue = f(...testPoint)
            stepMade = true
        } else {
            testPoint[i] -= 2 * step
            if(f(...testPoint) < f(...point)) {
                point = [...testPoint]
                bestFunctionValue = f(...testPoint)
                stepMade = true
            }
        }
    }
    if(stepMade == true) {
        let previousPoint = [...basePoint]
        basePoint = [...point]
        let newPoint = point.map((x, i) => basePoint[i] + 1.5 * (basePoint[i] - previousPoint[i]))
        let testFunctionValue = f(...newPoint)
        if(testFunctionValue < bestFunctionValue) {
            bestFunctionValue = testFunctionValue
            point = [...newPoint]
            step *= stepIncreaseFactor
        }
    } else {
        step *= stepReductionFactor
    }
    console.log(`f: ${bestFunctionValue}, point: ${point}`);
}
