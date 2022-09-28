import { Types } from 'mongoose';

export const stringToObjectId = ( uid : string ) => {
  return new Types.ObjectId( uid );
}
