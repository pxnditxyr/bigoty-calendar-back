import { model, Schema, Types } from 'mongoose';

export interface ISubdomain {
  name: string;
  description: string;
  observations: string;
  parent: string;
  domain: Types.ObjectId;
  status: boolean;
}


const SubdomainSchema = new Schema<ISubdomain>({

  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  observations: {
    type: String,
    default: '',
  },
  parent: {
    type: String,
    default: '',
  },
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'domain',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Subdomain = model<ISubdomain>( 'subdomain', SubdomainSchema );
export default Subdomain;
