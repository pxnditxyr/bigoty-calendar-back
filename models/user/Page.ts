import { model, Schema, Types } from 'mongoose';

interface IPage {
  title: string;
  description: string;
  content: string;
  headerColor: string;
  headerImage: string;
  bgColor: string;
  bgImage: string;
  profession: string;
  user: Types.ObjectId;
  status: boolean;
};

const PageSchema = new Schema<IPage>({

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  headerColor: {
    type: String,
    default: '#212529'
  },
  headerImage: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#f9f9f9'
  },
  bgImage: {
    type: String,
    default: ''
  },
  profession: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  }
});

PageSchema.method( 'toJSON', function () {
  const { __v, status, user, profession, ...object } = this.toObject();
  return object;
});

const Page = model<IPage>( 'page', PageSchema );

export default Page;
