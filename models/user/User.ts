import { model, ObjectId, Schema } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  google: boolean;
  people: ObjectId;
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
  people: {
    type: Schema.Types.ObjectId,
    ref: 'people',
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const User = model<IUser>( 'user', UserSchema );

export default User;
