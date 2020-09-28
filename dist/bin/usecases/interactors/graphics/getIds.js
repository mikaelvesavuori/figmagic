"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIds = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
exports.getIds = (graphicsPage) => {
    if (!graphicsPage)
        throw new Error(errors_1.ErrorGetIds);
    if (!(graphicsPage.length > 0))
        throw new Error(errors_1.ErrorGetIds);
    return graphicsPage
        .filter((item) => item.type === 'COMPONENT')
        .map((item) => {
        return { id: item.id, name: item.name };
    });
};
//# sourceMappingURL=getIds.js.map