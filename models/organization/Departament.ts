import { model, Schema, Types } from 'mongoose';

export interface IDepartament {
  name: string;
  description: string;
  type: Types.ObjectId;
  level: number;
  organization: Types.ObjectId;
  status: boolean;
};

const DepartamentSchema = new Schema<IDepartament>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'subdomain',
  },
  level: {
    type: Number,
    default: 1,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organization',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Departament = model<IDepartament>( 'departament', DepartamentSchema );
export default Departament;
