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
exports.setDepartament = exports.deleteProfile = exports.updateProfile = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/user/User"));
const People_1 = __importDefault(require("../models/user/People"));
const Departament_1 = __importDefault(require("../models/organization/Departament"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        // uid and status = true
        const user = yield User_1.default.findOne({ _id: uid, status: true });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        const people = yield People_1.default.findById(user.people);
        if (!people) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        return res.json({
            ok: true,
            uid: user._id,
            lastName: people.lastName,
            name: people.name,
            username: user.username,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        const user = yield User_1.default.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        const people = yield People_1.default.findById(user.people);
        if (!people) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        const { lastName, name, birthday, username, email, password } = req.body;
        if (user.username !== username) {
            const existUsername = yield User_1.default.findOne({ username });
            if (existUsername) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Username already exists'
                });
            }
        }
        if (user.email !== email) {
            const existEmail = yield User_1.default.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already exists'
                });
            }
        }
        yield People_1.default.findByIdAndUpdate(people._id, { lastName, name, birthday });
        yield User_1.default.findByIdAndUpdate(user._id, { username, email, password });
        return res.json({
            ok: true,
            msg: 'User updated'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    try {
        const user = yield User_1.default.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        const people = yield People_1.default.findById(user.people);
        if (!people) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }
        people.status = false;
        user.status = false;
        yield People_1.default.findByIdAndUpdate(people._id, people, { new: true });
        yield User_1.default.findByIdAndUpdate(user._id, user, { new: true });
        return res.json({
            ok: true,
            msg: 'User deleted'
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.deleteProfile = deleteProfile;
const setDepartament = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const { departamentId } = req.params;
    try {
        const departament = yield Departament_1.default.findById({ _id: departamentId, status: true });
        if (!departament) {
            return res.status(404).json({
                ok: false,
                msg: 'Departament not found'
            });
        }
        yield People_1.default.findByIdAndUpdate(uid, { departament }, { new: true });
        return res.json({
            ok: true,
            msg: 'Departament updated'
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
});
exports.setDepartament = setDepartament;
//# sourceMappingURL=profile.js.map