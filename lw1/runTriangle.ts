import {determineTriangleType, Triangle} from './index'

const sides = process.argv.slice(2).map(Number)
if (sides.length !== 3) {
    console.log(Triangle.UnknownError)
} else {
    const [a, b, c] = sides
    console.log(determineTriangleType({a, b, c}))
}