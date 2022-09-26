import { model, Schema } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  google: boolean;
  peopleUid: string;
  status: boolean;
};

const UserSchema = new Schema<IUser>({
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
    required: true,
    default: 'USER_ROLE',
    enum: [ 'ADMIN_ROLE', 'TEACHER_ROLE', 'STUDENT_ROLE', 'BOSS_ROLE', 'EMPLOYEE_ROLE', 'USER_ROLE' ],
  },
  google: {
    type: Boolean,
    default: false,
  },
  peopleUid: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const User = model<IUser>( 'user', UserSchema );

export default User;
