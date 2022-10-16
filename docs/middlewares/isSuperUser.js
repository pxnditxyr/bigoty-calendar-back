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
exports.isSuperUser = void 0;
const User_1 = __importDefault(require("../models/user/User"));
const isSuperUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        const user = yield User_1.default.findOne({ _id: uid, status: true });
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid credentials',
            });
        }
        if (user.role !== 'SUPER_USER') {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to perform this action',
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
    next();
});
exports.isSuperUser = isSuperUser;
//# sourceMappingURL=isSuperUser.js.map