"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartamentByUser = exports.getDepartamentsByOrganization = exports.getAllDepartaments = exports.deleteDepartament = exports.updateDepartament = exports.createDepartament = void 0;
const User_1 = __importDefault(require("../models/user/User"));
const Subdomain_1 = __importDefault(require("../models/lookup/Subdomain"));
const Organization_1 = __importDefault(require("../models/organization/Organization"));
const Departament_1 = __importDefault(require("../models/organization/Departament"));
const createDepartament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, type, level, organization } = req.body;
    try {
        const typeDepartament = yield Subdomain_1.default.findOne({ name: type, status: true });
        if (!typeDepartament) {
            return res.status(400).json({
                ok: false,
                msg: 'The departament type is not valid'
            });
        }
        const organizationDepartament = yield Organization_1.default.findOne({ name: organization, status: true });
        if (!organizationDepartament) {
            return res.status(400).json({
                ok: false,
                msg: 'The organization is not valid'
            });
        }
        const departament = new Departament_1.default({
            name,
            description,
            type: typeDepartament._id,
            level,
            organization: organizationDepartament._id,
        });
        yield departament.save();
        return res.status(201).json({
            ok: true,
            departament,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createDepartament = createDepartament;
const updateDepartament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, type, level } = req.body;
    const { id } = req.params;
    try {
        const departament = yield Departament_1.default.findOne({ _id: id, status: true });
        if (!departament) {
            return res.status(404).json({
                ok: false,
                msg: 'Departament not found',
            });
        }
        const typeDepartament = yield Subdomain_1.default.findOne({ name: type, status: true });
        if (!typeDepartament) {
            return res.status(400).json({
                ok: false,
                msg: 'The departament type is not valid'
            });
        }
        const newDepartament = {
            name,
            description,
            type: typeDepartament._id,
            level,
        };
        yield Departament_1.default.findByIdAndUpdate(id, newDepartament, { new: true });
        return res.status(200).json({
            ok: true,
            departament,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.updateDepartament = updateDepartament;
const deleteDepartament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const departament = yield Departament_1.default.findOne({ _id: id, status: true });
        if (!departament) {
            return res.status(404).json({
                ok: false,
                msg: 'Departament not found',
            });
        }
        yield Departament_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Departament deleted',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.deleteDepartament = deleteDepartament;
const getAllDepartaments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departaments = yield Departament_1.default.find({ status: true });
        const departamentsTable = departaments.map(({ _id, name, description, type, level, organization }) => __awaiter(void 0, void 0, void 0, function* () {
            const organizationDepartament = yield Organization_1.default.findOne({ _id: organization, status: true });
            const typeDepartament = yield Subdomain_1.default.findOne({ _id: type, status: true });
            return {
                _id,
                name,
                description,
                type: typeDepartament === null || typeDepartament === void 0 ? void 0 : typeDepartament.name,
                level,
                organization: organizationDepartament === null || organizationDepartament === void 0 ? void 0 : organizationDepartament.name,
            };
        }));
        const departamentsTablePromise = yield Promise.all(departamentsTable);
        return res.status(200).json({
            ok: true,
            departaments: departamentsTablePromise,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getAllDepartaments = getAllDepartaments;
const getDepartamentsByOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const departaments = yield Departament_1.default.find({ organization: id, status: true });
        const departamentsTable = departaments.map(({ _id, name, description, type, level, organization }) => __awaiter(void 0, void 0, void 0, function* () {
            const organizationDepartament = yield Organization_1.default.findOne({ _id: organization, status: true });
            const typeDepartament = yield Subdomain_1.default.findOne({ _id: type, status: true });
            return {
                _id,
                name,
                description,
                type: typeDepartament === null || typeDepartament === void 0 ? void 0 : typeDepartament.name,
                level,
                organization: organizationDepartament === null || organizationDepartament === void 0 ? void 0 : organizationDepartament.name,
            };
        }));
        const departamentsTablePromise = yield Promise.all(departamentsTable);
        return res.status(200).json({
            ok: true,
            departaments: departamentsTablePromise,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getDepartamentsByOrganization = getDepartamentsByOrganization;
const getDepartamentByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        const user = yield User_1.default.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found',
            });
        }
        if (user.role === 'USER_ROLE') {
            return res.status(400).json({
                ok: false,
                msg: 'User does not belong to any organization',
            });
        }
        const departament = yield Departament_1.default.findOne({ _id: user.departament, status: true }).populate('organization');
        if (!departament) {
            return res.status(404).json({
                ok: false,
                msg: 'Departament not found',
            });
        }
        return res.status(200).json({
            ok: true,
            departament,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getDepartamentByUser = getDepartamentByUser;
//# sourceMappingURL=departament.js.map