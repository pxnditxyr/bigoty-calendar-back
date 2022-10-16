"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid, lastName, name, email, username) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, lastName, name, email, username };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED || '', {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Could not generate token');
            }
            if (token)
                resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=jwt.js.map