export enum Triangle {
    Regular = 'Обычный',
    Isosceles = 'Равнобедренный',
    Equilateral = 'Равносторонний',
    NotATriangle = 'Не треугольник',
    UnknownError = 'Неизвестная ошибка'
}

export type DetermineTriangleTypeProps = {
    a: number,
    b: number,
    c: number
}

export const determineTriangleType = ({a, b, c}: DetermineTriangleTypeProps) => {
    if (a < 0 || b < 0 || c < 0) {
        return Triangle.UnknownError
    }

    //сумма длин двух любых сторон больше длины третьей стороны
    const isTriangle = a + b > c && a + c > b && b + c > a

    const isEquilateral = a === b && b === c
    const isIsosceles = a === b || a === c || b === c

    if (isTriangle) {
        if (isEquilateral) {
            return Triangle.Equilateral
        } else if (isIsosceles) {
            return Triangle.Isosceles
        } else {
            return Triangle.Regular
        }
    } else {
        return Triangle.NotATriangle
    }
}