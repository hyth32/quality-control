"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineTriangleType = exports.Triangle = void 0;
var Triangle;
(function (Triangle) {
    Triangle["Regular"] = "\u041E\u0431\u044B\u0447\u043D\u044B\u0439";
    Triangle["Isosceles"] = "\u0420\u0430\u0432\u043D\u043E\u0431\u0435\u0434\u0440\u0435\u043D\u043D\u044B\u0439";
    Triangle["Equilateral"] = "\u0420\u0430\u0432\u043D\u043E\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0439";
    Triangle["NotATriangle"] = "\u041D\u0435 \u0442\u0440\u0435\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A";
    Triangle["UnknownError"] = "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430";
})(Triangle || (exports.Triangle = Triangle = {}));
var determineTriangleType = function (_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    if (a < 0 || b < 0 || c < 0) {
        return Triangle.UnknownError;
    }
    //сумма длин двух любых сторон больше длины третьей стороны
    var isTriangle = a + b > c && a + c > b && b + c > a;
    var isEquilateral = a === b && b === c;
    var isIsosceles = a === b || a === c || b === c;
    if (isTriangle) {
        if (isEquilateral) {
            return Triangle.Equilateral;
        }
        else if (isIsosceles) {
            return Triangle.Isosceles;
        }
        else {
            return Triangle.Regular;
        }
    }
    else {
        return Triangle.NotATriangle;
    }
};
exports.determineTriangleType = determineTriangleType;
