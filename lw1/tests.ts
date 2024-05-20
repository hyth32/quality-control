import {promises as fs} from 'fs'
import {determineTriangleType} from './index'

const testTriangle = async () => {
    const testCases = await fs.readFile('testCases.txt', 'utf-8')
    const results = []

    for (const testCase of testCases.split('\n')) {
        if (testCase.trim() !== '') {
            const parts = testCase.split(' ')
            const [a, b, c] = [Number(parts[0]), Number(parts[1]), Number(parts[2])]
            const expected = parts.slice(3).join(' ').trim()
            const res = determineTriangleType({a, b, c})

            results.push(res === expected ? 'success' : 'error')
        }
    }

    await fs.writeFile('testResults.txt', results.join('\n'))
}

testTriangle().catch(error => console.error(error))