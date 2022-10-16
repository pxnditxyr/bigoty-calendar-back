"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departamentRouter = void 0;
const express_1 = require("express");
const departament_1 = require("../controllers/departament");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.departamentRouter = router;
router.use(middlewares_1.jwtValidator);
router.get('/user', departament_1.getDepartamentByUser);
router.use(middlewares_1.isSuperUser);
router.get('/', departament_1.getAllDepartaments);
router.get('/:organizationId', departament_1.getDepartamentsByOrganization);
router.post('/new-departament', departament_1.createDepartament);
router.put('/update-departament/:id', departament_1.updateDepartament);
router.delete('/delete-departament/:id', departament_1.deleteDepartament);
//# sourceMappingURL=departament.js.map