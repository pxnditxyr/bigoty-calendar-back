import { model, Schema, Types } from 'mongoose';

interface IPeople {
  lastName: string;
  name: string;
  birthday: Date;
  gender: Types.ObjectId;
  departament: Types.ObjectId;
  status: boolean;
};

const PeopleSchema = new Schema<IPeople>({
  lastName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'subdomain',
  },
  departament: {
    type: Schema.Types.ObjectId,
    ref: 'departament',
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  }
});

const People = model<IPeople>( 'people', PeopleSchema );

export default People;
