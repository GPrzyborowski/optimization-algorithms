let currentPoint = [100, 100]
let epsilon = 0.001
let difference = Infinity
let maxIterations = 1000
let iteration = 0
let stepSize = 0.1
let minStepSize = 0.01
let maxStepSize = 10

const f = (x, y) => {
	return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y
}

const derivativeX = (x, y) => {
	return 2 * x + y + 2
}

const derivativeY = (x, y) => {
	return 2 * y + x + 3
}

const gradient = (x, y) => {
	let gradX = derivativeX(x, y)
	let gradY = derivativeY(x, y)
	return [gradX, gradY]
}

const norm = (gradX, gradY) => {
	return Math.sqrt(Math.pow(gradX, 2) + Math.pow(gradY, 2))
}

const fPrim = (stepSize, currentPoint, grad) => {
	let x = currentPoint[0] - stepSize * grad[0]
	let y = currentPoint[1] - stepSize * grad[1]
	let newGrad = gradient(x, y)
	return -grad.reduce((sum, g, i) => sum + g * newGrad[i], 0)
}

const seffensen = (stepSize, currentPoint, grad) => {
	let firstDeriv = fPrim(stepSize, currentPoint, grad)
	let numerator = Math.pow(firstDeriv, 2)
	let shiftedDeriv = fPrim(stepSize + firstDeriv, currentPoint, grad)
	let denominator = shiftedDeriv - firstDeriv
	if (denominator == 0) {
		return stepSize
	}
	let newStepSize = stepSize - numerator / denominator
	newStepSize = Math.max(minStepSize, Math.min(newStepSize, maxStepSize))
	return newStepSize
}

while (true) {
	let grad = gradient(...currentPoint)
	let gradNorm = norm(grad[0], grad[1])
	if (gradNorm < epsilon || iteration > maxIterations) {
		break
	}
	stepSize = seffensen(stepSize, currentPoint, grad)
	currentPoint[0] = currentPoint[0] - stepSize * grad[0]
	currentPoint[1] = currentPoint[1] - stepSize * grad[1]
	iteration++
	console.log(`f: ${f(...currentPoint)}, xk: ${currentPoint}, lambda: ${stepSize}, iter: ${iteration}`)
}
