"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const PeopleSchema = new mongoose_1.Schema({
    lastName: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    gender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'subdomain',
    },
    departament: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'departament',
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
});
const People = (0, mongoose_1.model)('people', PeopleSchema);
exports.default = People;
//# sourceMappingURL=People.js.map