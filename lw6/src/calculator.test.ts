import {Calculator} from './calculator'
const testData = require('./calculatorTestData.json')

type TestType = {
    value: number,
    expectedError: {
        exists: boolean,
        message?: string
    },
    expectedResult: number,
    expectedHistory: string[]
}

describe('Calculator', () => {
    let calculator: Calculator

    beforeEach(() => {
        calculator = new Calculator()
    })

    const {
        additionTests,
        subtractionTests,
        multiplicationTests
    } = testData

    additionTests.forEach(({value, expectedError, expectedResult, expectedHistory}: TestType) => {
        test(`add ${value}`, async () => {
            if (expectedError.exists) {
                expect(() => calculator.checkNumber(value)).toThrow(expectedError.message)
                return
            }
            calculator.add(value)
            expect(calculator.getResult()).toBe(expectedResult)
            expect(calculator.getHistory()).toEqual(expectedHistory)
        })
    })

    // subtractionTests.forEach()

    test('subtract', () => {
        calculator.subtract(3)
        expect(calculator.getResult()).toBe(-3)
        expect(calculator.getHistory()).toEqual(['Subtracted 3'])
    })

    test('subtract negative value', () => {
        calculator.subtract(-3)
        expect(calculator.getResult()).toBe(3)
        expect(calculator.getHistory()).toEqual(['Subtracted -3'])
    })

    test('multiply', () => {
        calculator.add(2)
        calculator.multiply(3)
        expect(calculator.getResult()).toBe(6)
        expect(calculator.getHistory()).toEqual(['Added 2', 'Multiplied by 3'])
    })

    test('multiply by negative value', () => {
        calculator.add(2)
        calculator.multiply(-3)
        expect(calculator.getResult()).toBe(-6)
        expect(calculator.getHistory()).toEqual(['Added 2', 'Multiplied by -3'])
    })

    test('multiply by zero', () => {
        calculator.add(2)
        calculator.multiply(0)
        expect(calculator.getResult()).toBe(0)
        expect(calculator.getHistory()).toEqual(['Added 2', 'Multiplied by 0'])
    })

    test('divide', () => {
        calculator.add(10)
        calculator.divide(2)
        expect(calculator.getResult()).toBe(5)
        expect(calculator.getHistory()).toEqual(['Added 10', 'Divided by 2'])
    })

    test('divide by negative value', () => {
        calculator.add(10)
        calculator.divide(-2)
        expect(calculator.getResult()).toBe(-5)
        expect(calculator.getHistory()).toEqual(['Added 10', 'Divided by -2'])
    })

    test('divide by zero', () => {
        expect(() => calculator.divide(0)).toThrow('Cannot divide by zero')
        expect(calculator.getHistory()).toEqual([])
    })

    test('multiple operations', () => {
        calculator.add(5)
        calculator.subtract(2)
        calculator.multiply(3)
        calculator.divide(2)
        expect(calculator.getResult()).toBe(4.5)
        expect(calculator.getHistory()).toEqual(['Added 5', 'Subtracted 2', 'Multiplied by 3', 'Divided by 2'])
    })

    test('reset', () => {
        calculator.add(5)
        calculator.reset()
        expect(calculator.getResult()).toBe(0)
        expect(calculator.getHistory()).toEqual([])
    })

    test('reset multiple operations', () => {
        calculator.add(5)
        calculator.subtract(2)
        calculator.multiply(3)
        calculator.divide(2)
        calculator.reset()
        expect(calculator.getResult()).toBe(0)
        expect(calculator.getHistory()).toEqual([])
    })
})