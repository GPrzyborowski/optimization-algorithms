let temp = 1000
let minTemp = 0.01
let iter = 1000
let coolingRate = 0.95
let point = [Math.random() * 2000 - 1000, Math.random() * 2000 - 1000]

const f = (x, y) => {
	return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y
}

const neighbour = (x, y) => {
	let x1 = x + (Math.random() * 2 - 1)
	let y1 = y + (Math.random() * 2 - 1)
	return [x1, y1]
}

while (temp > minTemp) {
	for (let i = 0; i < iter; i++) {
		let neighbourPoint = neighbour(...point)
		let gamma = f(...neighbourPoint) - f(...point)
		if (gamma < 0) {
			point = [...neighbourPoint]
		} else {
			let x = Math.random()
			if (x < Math.exp(-gamma / temp)) {
				point = [...neighbourPoint]
			}
		}
	}
	temp *= coolingRate
	console.log(`f: ${f(...point)}, point: ${point}`)
}