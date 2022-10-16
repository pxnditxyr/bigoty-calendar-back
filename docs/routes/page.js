"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.pageRouter = router;
router.use(middlewares_1.jwtValidator);
router.get('/', controllers_1.getPage);
router.post('/new-page', [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    middlewares_1.fieldValidators
], controllers_1.createNewPage);
router.put('/update/:id', [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    middlewares_1.fieldValidators
], controllers_1.updatePage);
router.delete('/delete/:id', controllers_1.deletePage);
//# sourceMappingURL=page.js.map