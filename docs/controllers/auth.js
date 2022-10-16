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
exports.renewToken = exports.signInUser = exports.signUpUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const People_1 = __importDefault(require("../models/user/People"));
const User_1 = __importDefault(require("../models/user/User"));
const helpers_1 = require("../helpers");
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lastName, name, birthday, username, email, password } = req.body;
    try {
        const existUserWithEmail = yield User_1.default.findOne({ email, status: true });
        const existUserWithUsername = yield User_1.default.findOne({ username, status: true });
        if (Boolean(existUserWithEmail) || Boolean(existUserWithUsername)) {
            return res.status(400).json({
                ok: false,
                msg: {
                    email: existUserWithEmail ? 'Email already exist' : null,
                    username: existUserWithUsername ? 'Username already exist' : null
                }
            });
        }
        const peopleData = new People_1.default({ lastName, name, birthday });
        const people = peopleData._id;
        const user = new User_1.default({ username, email, password, people });
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        yield peopleData.save();
        yield user.save();
        const token = yield (0, helpers_1.generateJWT)(user._id.toString(), peopleData.lastName, peopleData.name, user.email, user.username);
        return res.status(201).json({
            ok: true,
            msg: 'created user',
            uid: user._id,
            lastName: peopleData.lastName,
            name: peopleData.name,
            username: user.username,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.signUpUser = signUpUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData, password } = req.body;
        const user = yield User_1.default.findOne({
            $or: [
                { email: userData },
                { username: userData }
            ]
        });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password incorrect'
            });
        }
        if (user.status === false) {
            return res.status(400).json({
                ok: false,
                msg: 'This user does not exist'
            });
        }
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'User or password incorrect'
            });
        }
        const people = yield People_1.default.findById(user.people);
        if (!people) {
            return res.status(500).json({
                ok: false,
                msg: 'Please contact the administrator'
            });
        }
        const token = yield (0, helpers_1.generateJWT)(user._id.toString(), people.lastName, people.name, user.email, user.username);
        return res.json({
            ok: true,
            msg: 'sign in user',
            uid: user._id,
            lastName: people.lastName,
            name: people.name,
            username: user.username,
            email: user.email,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.signInUser = signInUser;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, lastName, name, email, username } = req;
        const token = yield (0, helpers_1.generateJWT)(uid, lastName, name, email, username);
        return res.json({
            ok: true,
            msg: 'renew token',
            uid,
            lastName,
            name,
            username,
            email,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator',
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map