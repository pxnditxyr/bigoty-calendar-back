"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const isDate = (value) => {
    if (!value)
        return false;
    const date = new Date(value);
    if (isNaN(date.getTime()))
        return false;
    return true;
};
exports.isDate = isDate;
//# sourceMappingURL=isDate.js.map