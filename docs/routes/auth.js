"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/signup', [
    (0, express_validator_1.check)('lastName', 'Last name is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('birthday', 'Birthday is required').custom(helpers_1.isDate),
    (0, express_validator_1.check)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
    middlewares_1.fieldValidators
], controllers_1.signUpUser);
router.post('/signin', [
    (0, express_validator_1.check)('user', 'Username or Email is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
    middlewares_1.fieldValidators
], controllers_1.signInUser);
router.get('/renew-token', middlewares_1.jwtValidator, controllers_1.renewToken);
//# sourceMappingURL=auth.js.map