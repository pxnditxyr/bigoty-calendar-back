"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.organizationRouter = router;
router.use(middlewares_1.jwtValidator);
router.use(middlewares_1.isSuperUser);
router.get('/', controllers_1.getAllOrganizations);
router.get('/:name', controllers_1.getOrganizationsByName);
router.post('/new-organization', controllers_1.createOrganization);
router.put('/update-organization/:id', controllers_1.updateOrganization);
router.delete('/delete-organization/:id', controllers_1.deleteOrganization);
//# sourceMappingURL=organization.js.map