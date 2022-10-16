"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const OrganizationSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
    direction: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'subdomain',
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const Organization = (0, mongoose_1.model)('organization', OrganizationSchema);
exports.default = Organization;
//# sourceMappingURL=Organization.js.map