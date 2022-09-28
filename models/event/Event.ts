import { model, Types, Schema } from 'mongoose';

interface IEvent {
  title: string;
  note: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: Types.ObjectId;
  status: boolean;
};

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  bgColor: {
    type: String,
    default: '#EB1D36',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  }
});

EventSchema.method( 'toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object;
});

const Event = model<IEvent>( 'event', EventSchema );

export default Event;

