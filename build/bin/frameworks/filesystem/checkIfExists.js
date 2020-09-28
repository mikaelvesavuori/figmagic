"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfExists = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
exports.checkIfExists = (path) => fs.existsSync(path);
//# sourceMappingURL=checkIfExists.js.map