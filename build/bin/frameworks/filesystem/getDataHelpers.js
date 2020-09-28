"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImports = exports.getExtraProps = exports.getText = exports.getElement = void 0;
const createImportStringFromList_1 = require("../string/createImportStringFromList");
exports.getElement = (metadata) => {
    if (metadata) {
        if (metadata.element)
            return metadata.element;
        else
            return 'div';
    }
    else
        return 'div';
};
exports.getText = (metadata) => {
    if (metadata) {
        if (metadata.text)
            return metadata.text;
        else
            return '';
    }
    else
        return '';
};
exports.getExtraProps = (metadata) => {
    if (metadata) {
        if (metadata.extraProps)
            return metadata.extraProps;
        else
            return '';
    }
    else
        return '';
};
exports.getImports = (metadata) => {
    if (metadata) {
        if (metadata.imports) {
            if (metadata.imports.length > 0)
                return createImportStringFromList_1.createImportStringFromList(metadata.imports);
            else
                return '';
        }
        else
            return '';
    }
    else
        return '';
};
//# sourceMappingURL=getDataHelpers.js.map