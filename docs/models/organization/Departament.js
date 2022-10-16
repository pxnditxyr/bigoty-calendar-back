"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const DepartamentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    type: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'subdomain',
    },
    level: {
        type: Number,
        default: 1,
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'organization',
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const Departament = (0, mongoose_1.model)('departament', DepartamentSchema);
exports.default = Departament;
//# sourceMappingURL=Departament.js.map