"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var sides = process.argv.slice(2).map(Number);
if (sides.length !== 3) {
    console.log(index_1.Triangle.UnknownError);
}
else {
    var a = sides[0], b = sides[1], c = sides[2];
    console.log((0, index_1.determineTriangleType)({ a: a, b: b, c: c }));
}
