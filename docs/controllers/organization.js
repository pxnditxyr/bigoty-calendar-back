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
exports.getOrganizationsByName = exports.getAllOrganizations = exports.deleteOrganization = exports.updateOrganization = exports.createOrganization = void 0;
const Organization_1 = __importDefault(require("../models/organization/Organization"));
const Subdomain_1 = __importDefault(require("../models/lookup/Subdomain"));
const createOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, website, direction, image, type } = req.body;
        const organizationType = yield Subdomain_1.default.findOne({ name: type, status: true });
        if (!organizationType) {
            return res.status(400).json({
                ok: false,
                msg: 'The organization type is not valid'
            });
        }
        const organization = new Organization_1.default({
            name,
            email,
            website,
            direction,
            image,
            type: organizationType._id,
        });
        yield organization.save();
        return res.status(201).json({
            ok: true,
            organization,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createOrganization = createOrganization;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, website, direction, image, type } = req.body;
    const { id } = req.params;
    try {
        const organization = yield Organization_1.default.findOne({ _id: id, status: true });
        if (!organization) {
            return res.status(404).json({
                ok: false,
                msg: 'Organization not found',
            });
        }
        const organizationType = yield Subdomain_1.default.findOne({ name: type, status: true });
        if (!organizationType) {
            return res.status(400).json({
                ok: false,
                msg: 'The organization type is not valid'
            });
        }
        const newOrganization = {
            name,
            email,
            website,
            direction,
            image,
            type: organizationType._id,
        };
        yield Organization_1.default.findByIdAndUpdate(id, newOrganization, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Organization updated',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const organization = yield Organization_1.default.findOne({ _id: id, status: true });
        if (!organization) {
            return res.status(404).json({
                ok: false,
                msg: 'Organization not found',
            });
        }
        yield Organization_1.default.findByIdAndUpdate(id, { status: false }, { new: true });
        return res.status(200).json({
            ok: true,
            msg: 'Organization deleted',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.deleteOrganization = deleteOrganization;
const getAllOrganizations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield Organization_1.default.find({ status: true });
        return res.status(200).json({
            ok: true,
            organizations,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getAllOrganizations = getAllOrganizations;
const getOrganizationsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const organizations = yield Organization_1.default.find({ name: new RegExp(name, 'i'), status: true });
        return res.status(200).json({
            ok: true,
            organizations,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getOrganizationsByName = getOrganizationsByName;
//# sourceMappingURL=organization.js.map