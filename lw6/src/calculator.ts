export class Calculator {
    private _result: number
    private _history: string[]

    constructor() {
        this._result = 0
        this._history = []
    }

    public checkNumber(value: number) {
        const number = Number(value)
        const maxNumber = Math.pow(2, 53) - 1
        const minNumber = -maxNumber

        if (!number) {
            throw new Error('Value is not a number')
        }
        if (number > maxNumber || number < minNumber) {
            throw new Error('Value is not in number type range')
        }
    }

    public add(value: number): void {
        this._result += value
        this._history.push(`Added ${value}`)
    }

    public subtract(value: number): void {
        this._result -= value
        this._history.push(`Subtracted ${value}`)
    }

    public multiply(value: number): void {
        this._result *= value
        this._history.push(`Multiplied by ${value}`)
    }

    public divide(value: number): void {
        if (value === 0) {
            throw new Error('Cannot divide by zero')
        }
        this._result /= value
        this._history.push(`Divided by ${value}`)
    }

    public getResult(): number {
        return this._result
    }

    public getHistory(): string[] {
        return this._history
    }

    public reset(): void {
        this._result = 0
        this._history = []
    }
}