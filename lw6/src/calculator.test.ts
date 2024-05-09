import {Calculator} from './calculator'

describe('Calculator', () => {
    let calculator: Calculator

    beforeEach(() => {
        calculator = new Calculator()
    })

    test('add', () => {
        calculator.add(5)
        expect(calculator.getResult()).toBe(5)
        expect(calculator.getHistory()).toEqual(['Added 5'])
    })

    test('subtract', () => {
        calculator.subtract(3)
        expect(calculator.getResult()).toBe(-3)
        expect(calculator.getHistory()).toEqual(['Subtracted 3'])
    })

    test('multiply', () => {
        calculator.add(2)
        calculator.multiply(3)
        expect(calculator.getResult()).toBe(6)
        expect(calculator.getHistory()).toEqual(['Added 2', 'Multiplied by 3'])
    })

    test('divide', () => {
        calculator.add(10)
        calculator.divide(2)
        expect(calculator.getResult()).toBe(5)
        expect(calculator.getHistory()).toEqual(['Added 10', 'Divided by 2'])
    })

    test('divide by zero', () => {
        expect(() => calculator.divide(0)).toThrow('Cannot divide by zero')
        expect(calculator.getHistory()).toEqual([])
    })

    test('reset', () => {
        calculator.add(5)
        calculator.reset()
        expect(calculator.getResult()).toBe(0)
        expect(calculator.getHistory()).toEqual([])
    })
})