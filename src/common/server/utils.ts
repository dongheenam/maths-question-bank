import { WithId } from 'mongodb';

// MongoDB documents cannot be serialized to JSON directly
// because of its ObjectId
export const toPlainDocument = <T extends any>(documentWithId: WithId<T>) => {
  return { ...documentWithId, _id: documentWithId._id.toHexString() };
};
