"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.profileRouter = router;
router.use(middlewares_1.jwtValidator);
router.get('/', controllers_1.getProfile);
router.put('/update', [
    (0, express_validator_1.check)('lastName', 'Last name is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('birthday', 'Birthday must be a date').custom(helpers_1.isDate),
    (0, express_validator_1.check)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
    middlewares_1.fieldValidators
], controllers_1.updateProfile);
router.delete('/delete', controllers_1.deleteProfile);
router.use(middlewares_1.isSuperUser);
router.put('/set-departament/:departamentId', controllers_1.setDepartament);
//# sourceMappingURL=profile.js.map