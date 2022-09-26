import { model, Schema } from 'mongoose';

interface IPeople {
  lastName: string;
  name: string;
  birthday: Date;
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
  status: {
    type: Boolean,
    required: true,
    default: true,
  }
});

const People = model<IPeople>( 'people', PeopleSchema );

export default People;
