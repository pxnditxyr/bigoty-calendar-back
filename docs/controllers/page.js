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
exports.deletePage = exports.updatePage = exports.createNewPage = exports.getPage = void 0;
const helpers_1 = require("../helpers");
const Page_1 = __importDefault(require("../models/user/Page"));
const getPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const page = yield Page_1.default.findOne({
        user: (0, helpers_1.stringToObjectId)(uid),
        status: true
    });
    if (!page) {
        return res.status(404).json({
            ok: false,
            msg: 'Page not found'
        });
    }
    return res.json({
        ok: true,
        page
    });
});
exports.getPage = getPage;
const createNewPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const { title, description, content, profession, headerColor, headerImage, bgColor, bgImage } = req.body;
    const page = new Page_1.default({ title, description, content, profession, headerColor, headerImage, bgColor, bgImage });
    try {
        page.user = (0, helpers_1.stringToObjectId)(uid);
        yield page.save();
        return res.status(201).json({
            ok: true,
            page
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.createNewPage = createNewPage;
const updatePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const page = yield Page_1.default.findById(id);
        if (!page) {
            return res.status(404).json({
                ok: false,
                msg: 'Page not found'
            });
        }
        if (page.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to edit this page'
            });
        }
        const newPage = Object.assign(Object.assign({}, req.body), { user: req.uid });
        const updatedPage = yield Page_1.default.findByIdAndUpdate(id, newPage, { new: true });
        return res.json({
            ok: true,
            msg: 'Updated page',
            page: updatedPage
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.updatePage = updatePage;
const deletePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const page = yield Page_1.default.findById(id);
        if (!page) {
            return res.status(404).json({
                ok: false,
                msg: 'Page not found'
            });
        }
        if (page.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to delete this page'
            });
        }
        page.status = false;
        yield Page_1.default.findByIdAndUpdate(id, page, { new: true });
        return res.json({
            ok: true,
            msg: 'Page deleted'
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.deletePage = deletePage;
//# sourceMappingURL=page.js.map