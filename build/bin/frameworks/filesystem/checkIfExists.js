"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfExists = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const checkIfExists = (path) => fs.existsSync(path);
exports.checkIfExists = checkIfExists;
//# sourceMappingURL=checkIfExists.js.map