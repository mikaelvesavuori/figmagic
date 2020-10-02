"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPage = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function createPage(figmaPages, matchingPageName) {
    try {
        if (!figmaPages || !(figmaPages.length > 0))
            throw new Error(errors_1.ErrorCreatePage);
        const PAGE = figmaPages.filter((page) => page.name.toLowerCase().replace(/ /g, '') ===
            matchingPageName.toLowerCase().replace(/ /g, ''));
        if (PAGE.length > 0 && PAGE[0].children)
            return PAGE[0].children;
        return [];
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.createPage = createPage;
//# sourceMappingURL=createPage.js.map