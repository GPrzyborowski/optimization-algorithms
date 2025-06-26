let minPosition = -10
let maxPosition = 10
let numberOfParticles = 50
let numberOfIterations = 1000
let personalCoefficient = 1.5
let globalCoefficient = 1.5

const f = (x, y) => {
    return Math.pow(x, 2) + Math.pow(y, 2) + x * y + 2 * x + 3 * y;
}

class Particle {
    constructor() {
        this.x = minPosition + (maxPosition - minPosition) * Math.random()
        this.y = minPosition + (maxPosition - minPosition) * Math.random()
        this.vx = (Math.random() * 2 - 1) * (maxPosition - minPosition)
        this.vy = (Math.random() * 2 - 1) * (maxPosition - minPosition)
        this.bestX = this.x
        this.bestY = this.y
        this.bestValue = Infinity
    }
}

let bestGlobalX = 0
let bestGlobalY = 0
let bestGlobalValue = Infinity

let particles = []
for(let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle())
}

for(let j = 0; j < numberOfIterations; j++) {
    particles.forEach(particle => {
        let value = f(particle.x, particle.y)
        if(value < particle.bestValue) {
            particle.bestX = particle.x
            particle.bestY = particle.y
            particle.bestValue = value
        }
        if(value < bestGlobalValue) {
            bestGlobalX = particle.x
            bestGlobalY = particle.y
            bestGlobalValue = value
        }
    })
    particles.forEach(particle => {
        let r1 = Math.random()
        let r2 = Math.random()
        particle.vx = r1 * personalCoefficient * (particle.bestX - particle.x) + r2 * globalCoefficient * (bestGlobalX - particle.x)
        particle.vy = r1 * personalCoefficient * (particle.bestY - particle.y) + r2 * globalCoefficient * (bestGlobalY - particle.y)
        particle.x += particle.vx
        particle.y += particle.vy
        particle.x = Math.max(minPosition, Math.min(particle.x, maxPosition))
        particle.y = Math.max(minPosition, Math.min(particle.y, maxPosition))
    })
    console.log(`f: ${bestGlobalValue}`);
}
