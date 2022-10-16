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
const EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        default: '',
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    bgColor: {
        type: String,
        default: '#EB1D36',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});
EventSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v } = _a, object = __rest(_a, ["__v"]);
    return object;
});
const Event = (0, mongoose_1.model)('event', EventSchema);
exports.default = Event;
//# sourceMappingURL=Event.js.map