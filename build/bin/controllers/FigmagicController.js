"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmagicController = void 0;
const tslib_1 = require("tslib");
const createTokens_1 = require("../usecases/createTokens");
const createElements_1 = require("../usecases/createElements");
const createGraphics_1 = require("../usecases/createGraphics");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
function FigmagicController(config, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!config || !data)
                throw new Error(errors_1.ErrorFigmagicController);
            if (config.syncGraphics)
                yield createGraphics_1.createGraphics(config, data);
            if (config.syncTokens)
                yield createTokens_1.createTokens(config, data);
            if (config.syncElements)
                yield createElements_1.createElements(config, data);
            console.log(messages_1.MsgJobComplete);
            return messages_1.MsgJobComplete;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.FigmagicController = FigmagicController;
//# sourceMappingURL=FigmagicController.js.map