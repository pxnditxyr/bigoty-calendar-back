"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.eventsRouter = router;
router.use(middlewares_1.jwtValidator);
router.get('/', controllers_1.getEvents);
router.post('/new-event', [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.check)('start', 'Start date is required and must be a valid date').custom(helpers_1.isDate),
    (0, express_validator_1.check)('end', 'End date is required and must be a valid date').custom(helpers_1.isDate),
    middlewares_1.fieldValidators
], controllers_1.createNewEvent);
router.put('/update/:id', [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.check)('start', 'Start date is required and must be a valid date').custom(helpers_1.isDate),
    (0, express_validator_1.check)('end', 'End date is required and must be a valid date').custom(helpers_1.isDate),
    middlewares_1.fieldValidators
], controllers_1.updateEvent);
router.delete('/delete/:id', controllers_1.deleteEvent);
//# sourceMappingURL=events.js.map