"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const PageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    headerColor: {
        type: String,
        default: '#212529'
    },
    headerImage: {
        type: String,
        default: ''
    },
    bgColor: {
        type: String,
        default: '#f9f9f9'
    },
    bgImage: {
        type: String,
        default: ''
    },
    profession: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
});
PageSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v, status, user, profession } = _a, object = __rest(_a, ["__v", "status", "user", "profession"]);
    return object;
});
const Page = (0, mongoose_1.model)('page', PageSchema);
exports.default = Page;
//# sourceMappingURL=Page.js.map