import { model, Schema } from 'mongoose';

interface IDomain {
  name: string;
  description: string;
  status: boolean;
}


const DomainSchema = new Schema<IDomain>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Domain = model<IDomain>( 'domain', DomainSchema );

export default Domain;
