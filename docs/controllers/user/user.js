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
exports.getUserByEmailOrUsername = exports.getUserByUsername = exports.getUserByEmail = exports.getUserById = void 0;
const User_1 = __importDefault(require("../../models/user/User"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(id);
    return user;
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    return user;
});
exports.getUserByUsername = getUserByUsername;
const getUserByEmailOrUsername = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ $or: [{ email: userData }, { username: userData }] });
    return user;
});
exports.getUserByEmailOrUsername = getUserByEmailOrUsername;
//# sourceMappingURL=user.js.map