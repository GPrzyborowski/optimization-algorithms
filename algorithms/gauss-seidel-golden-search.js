let x = 100
let y = 100
let a = -10
let b = 10
let e = 0.0001
let diff = Infinity
let goldenRatio = (Math.sqrt(5) - 1) / 2

const f = (x, y) => {
    return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y;
}

const golden = (f, a, b) => {
    while(Math.abs(b - a) > e) {
        let xL = b - goldenRatio * (b - a)
        let xR = a + goldenRatio * (b - a)
        if(f(xL) < f(xR)) {
            b = xR
            xR = xL
            xL = b - goldenRatio * (b - a)
        } else {
            a = xL
            xL = xR
            xR = a + goldenRatio * (b - a)
        }
    }
    return (a + b) / 2
}

while(diff > e) {
    let prevX = x
    let prevY = y
    x = golden((xVal) => f(xVal, y), a, b)
    y = golden((yVal) => f(x, yVal), a, b)
    let deltaX = Math.abs(x - prevX)
    let deltaY = Math.abs(y - prevY)
    diff = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    console.log(`f: ${f(x, y)}, x: ${x}, y: ${y}`);
}