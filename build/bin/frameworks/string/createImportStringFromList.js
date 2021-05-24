"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImportStringFromList = void 0;
const errors_1 = require("../errors/errors");
function createImportStringFromList(importArray, outputFolderTokens = 'tokens', tokensRelativeImportPrefix = '') {
    if (!importArray)
        throw new Error(errors_1.ErrorCreateImportStringFromList);
    if (!(importArray.length > 0))
        throw new Error(errors_1.ErrorCreateImportStringFromListZeroLength);
    let importString = ``;
    importArray.forEach((importItem) => {
        importString += `import ${importItem} from '${tokensRelativeImportPrefix}${outputFolderTokens}/${importItem}';\n`;
    });
    return importString;
}
exports.createImportStringFromList = createImportStringFromList;
//# sourceMappingURL=createImportStringFromList.js.map