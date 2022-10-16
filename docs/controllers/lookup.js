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
exports.deleteSubdomain = exports.updateSubdomain = exports.createSubdomain = exports.getSubdomain = exports.deleteDomain = exports.updateDomain = exports.createDomain = exports.createFullDomain = exports.getDomain = exports.getAllDomains = void 0;
const Domain_1 = __importDefault(require("../models/lookup/Domain"));
const Subdomain_1 = __importDefault(require("../models/lookup/Subdomain"));
const getAllDomains = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const domains = yield Domain_1.default.find({ status: true });
        const subdomains = yield Subdomain_1.default.find({ status: true });
        const table = domains.map(domain => {
            return {
                id: domain._id,
                name: domain.name,
                subdomains: subdomains.filter(subdomain => subdomain.domain.toString() === domain._id.toString())
            };
        });
        return res.json({
            ok: true,
            table,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getAllDomains = getAllDomains;
const getDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName } = req.params;
    try {
        const domain = yield Domain_1.default.findOne({ name: domainName });
        if (!domain) {
            return res.status(404).json({
                ok: false,
                msg: 'Domain not found',
            });
        }
        const subdomains = yield Subdomain_1.default.find({ domain: domain._id, status: true });
        const table = {
            id: domain._id,
            name: domain.name,
            subdomains: Boolean(subdomains) ? subdomains : [],
        };
        return res.json({
            ok: true,
            table,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getDomain = getDomain;
const createFullDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, subdomains } = req.body;
    try {
        const existDomain = yield Domain_1.default.findOne({ name, status: true });
        if (existDomain) {
            return res.status(400).json({
                ok: false,
                msg: 'The domain already exists',
            });
        }
        const domain = new Domain_1.default({ name, description });
        yield domain.save();
        const subdomainsToSave = subdomains.map(({ name, description, observations, parent }) => {
            return new Subdomain_1.default({ name, description, observations, parent, domain: domain._id });
        });
        yield Subdomain_1.default.insertMany(subdomainsToSave);
        return res.json({
            ok: true,
            msg: 'Domain created',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createFullDomain = createFullDomain;
const createDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const existDomain = yield Domain_1.default.findOne({ name, status: true });
        if (existDomain) {
            return res.status(400).json({
                ok: false,
                msg: 'The domain already exists',
            });
        }
        const domain = new Domain_1.default({ name, description });
        yield domain.save();
        return res.json({
            ok: true,
            msg: 'Domain created',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createDomain = createDomain;
const updateDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const { domainName } = req.params;
    try {
        const domain = yield Domain_1.default.findOne({ name: domainName, status: true });
        if (!domain) {
            return res.status(400).json({
                ok: false,
                msg: 'The domain does not exist',
            });
        }
        const newDomain = { name, description };
        yield Domain_1.default.findByIdAndUpdate(domain._id, newDomain, { new: true });
        return res.json({
            ok: true,
            msg: 'Domain updated',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.updateDomain = updateDomain;
const deleteDomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { domainName } = req.params;
    try {
        const domain = yield Domain_1.default.findOne({ name: domainName, status: true });
        if (!domain) {
            return res.status(400).json({
                ok: false,
                msg: 'The domain does not exist',
            });
        }
        yield Domain_1.default.findByIdAndUpdate(domain._id, { status: false }, { new: true });
        return res.json({
            ok: true,
            msg: 'Domain deleted',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.deleteDomain = deleteDomain;
const getSubdomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subdomainName } = req.params;
    try {
        const subdomain = yield Subdomain_1.default.findOne({ subdomainName, status: true });
        if (!subdomain) {
            return res.status(404).json({
                ok: false,
                msg: 'Subdomain not found',
            });
        }
        return res.json({
            ok: true,
            subdomain,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.getSubdomain = getSubdomain;
const createSubdomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, observations, parent } = req.body;
    const { domainName } = req.params;
    try {
        const domain = yield Domain_1.default.findOne({ name: domainName, status: true });
        if (!domain) {
            return res.status(400).json({
                ok: false,
                msg: 'The domain does not exist',
            });
        }
        const existSubdomain = yield Subdomain_1.default.findOne({ name, status: true });
        if (existSubdomain) {
            return res.status(400).json({
                ok: false,
                msg: 'The subdomain already exists',
            });
        }
        const subdomain = new Subdomain_1.default({ name, description, observations, parent, domain: domain._id });
        yield subdomain.save();
        return res.json({
            ok: true,
            msg: 'Subdomain created',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.createSubdomain = createSubdomain;
const updateSubdomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, observations, parent } = req.body;
    const { subdomainName } = req.params;
    try {
        const subdomain = yield Subdomain_1.default.findOne({ name: subdomainName, status: true });
        if (!subdomain) {
            return res.status(400).json({
                ok: false,
                msg: 'The subdomain does not exist',
            });
        }
        const newSubdomain = { name, description, observations, parent };
        yield Subdomain_1.default.findByIdAndUpdate(subdomain._id, newSubdomain, { new: true });
        return res.json({
            ok: true,
            msg: 'Subdomain updated',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.updateSubdomain = updateSubdomain;
const deleteSubdomain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subdomainName } = req.params;
    try {
        const subdomain = yield Subdomain_1.default.findOne({ name: subdomainName, status: true });
        if (!subdomain) {
            return res.status(400).json({
                ok: false,
                msg: 'The subdomain does not exist',
            });
        }
        yield Subdomain_1.default.findByIdAndUpdate(subdomain._id, { status: false }, { new: true });
        return res.json({
            ok: true,
            msg: 'Subdomain deleted',
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.deleteSubdomain = deleteSubdomain;
//# sourceMappingURL=lookup.js.map