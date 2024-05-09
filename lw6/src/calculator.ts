export class Calculator {
    private _result: number
    private _history: string[]

    constructor() {
        this._result = 0
        this._history = []
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