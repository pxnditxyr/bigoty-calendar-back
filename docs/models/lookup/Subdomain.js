"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubdomainSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    observations: {
        type: String,
        default: '',
    },
    parent: {
        type: String,
        default: '',
    },
    domain: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'domain',
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const Subdomain = (0, mongoose_1.model)('subdomain', SubdomainSchema);
exports.default = Subdomain;
//# sourceMappingURL=Subdomain.js.map