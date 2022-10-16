"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToObjectId = void 0;
const mongoose_1 = require("mongoose");
const stringToObjectId = (uid) => {
    return new mongoose_1.Types.ObjectId(uid);
};
exports.stringToObjectId = stringToObjectId;
//# sourceMappingURL=stringToObjectId.js.map