"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DomainSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const Domain = (0, mongoose_1.model)('domain', DomainSchema);
exports.default = Domain;
//# sourceMappingURL=Domain.js.map