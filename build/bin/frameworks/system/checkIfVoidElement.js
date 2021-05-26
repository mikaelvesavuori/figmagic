"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfVoidElement = void 0;
function checkIfVoidElement(elementName) {
    if (!elementName)
        return false;
    const elements = [
        'area',
        'base',
        'basefont',
        'bgsound',
        'br',
        'col',
        'command',
        'embed',
        'frame',
        'hr',
        'image',
        'img',
        'input',
        'isindex',
        'keygen',
        'link',
        'menuitem',
        'meta',
        'nextid',
        'param',
        'source',
        'track',
        'wbr'
    ];
    return elements.includes(elementName);
}
exports.checkIfVoidElement = checkIfVoidElement;
//# sourceMappingURL=checkIfVoidElement.js.map