import { model, Schema, Types } from 'mongoose';

interface IOrganization {
  name: string;
  email: string;
  website: string;
  direction: string;
  image: string;
  type: Types.ObjectId;
  status: boolean;
};

const OrganizationSchema = new Schema<IOrganization>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  direction: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'subdomain',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Organization = model<IOrganization>( 'organization', OrganizationSchema );
export default Organization;
