"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['SUPER_USER', 'ADMIN_ROLE', 'TEACHER_ROLE', 'STUDENT_ROLE', 'BOSS_ROLE', 'EMPLOYEE_ROLE', 'USER_ROLE'],
    },
    google: {
        type: Boolean,
        default: false,
    },
    people: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'people',
        required: true
    },
    departament: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'departament',
    },
    status: {
        type: Boolean,
        default: true,
    },
});
const User = (0, mongoose_1.model)('user', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map