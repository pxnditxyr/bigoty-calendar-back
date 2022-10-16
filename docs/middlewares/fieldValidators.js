"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidators = void 0;
const express_validator_1 = require("express-validator");
const fieldValidators = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};
exports.fieldValidators = fieldValidators;
//# sourceMappingURL=fieldValidators.js.map