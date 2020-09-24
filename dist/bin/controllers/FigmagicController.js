"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmagicController = void 0;
const createTokens_1 = require("../usecases/createTokens");
const createElements_1 = require("../usecases/createElements");
const createGraphics_1 = require("../usecases/createGraphics");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
async function FigmagicController(config, data) {
    try {
        if (!config || !data)
            throw new Error(errors_1.ErrorFigmagicController);
        await createTokens_1.createTokens(config, data);
        if (config.syncElements)
            await createElements_1.createElements(config, data);
        if (config.syncGraphics)
            await createGraphics_1.createGraphics(config, data);
        console.log(messages_1.MsgJobComplete);
        return messages_1.MsgJobComplete;
    }
    catch (error) {
        throw new Error(errors_1.ErrorFigmagicController);
    }
}
exports.FigmagicController = FigmagicController;
//# sourceMappingURL=FigmagicController.js.map