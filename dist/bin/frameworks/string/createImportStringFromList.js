"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImportStringFromList = void 0;
const errors_1 = require("../errors/errors");
function createImportStringFromList(importArray) {
    if (!importArray)
        throw new Error(errors_1.ErrorCreateImportStringFromList);
    if (!(importArray.length > 0))
        throw new Error(errors_1.ErrorCreateImportStringFromListZeroLength);
    let importString = ``;
    importArray.forEach((i) => {
        importString += `import ${i} from 'tokens/${i}';\n`;
    });
    return importString;
}
exports.createImportStringFromList = createImportStringFromList;
//# sourceMappingURL=createImportStringFromList.js.map