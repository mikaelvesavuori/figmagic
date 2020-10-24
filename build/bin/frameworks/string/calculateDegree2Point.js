"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDegree2Point = void 0;
const roundNumber_1 = require("../../frameworks/string/roundNumber");
const errors_1 = require("../../frameworks/errors/errors");
function calculateDegree2Point(point1, point2) {
    if (!point1 || !point2)
        throw new Error(errors_1.ErrorCalculateDegree2Point);
    const ANGLE_DEG = ((Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI + 450) % 360;
    return roundNumber_1.roundNumber(ANGLE_DEG, 2);
}
exports.calculateDegree2Point = calculateDegree2Point;
//# sourceMappingURL=calculateDegree2Point.js.map