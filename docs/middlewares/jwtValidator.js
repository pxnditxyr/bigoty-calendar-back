"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtValidator = (req, res, next) => {
    // x-token headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }
    try {
        const { uid, lastName, name, email, username } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED || '');
        req.uid = uid;
        req.lastName = lastName;
        req.name = name;
        req.email = email;
        req.username = username;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        });
    }
    next();
};
exports.jwtValidator = jwtValidator;
//# sourceMappingURL=jwtValidator.js.map