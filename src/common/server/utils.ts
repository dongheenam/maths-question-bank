import { ObjectId } from 'mongodb';

// MongoDB documents cannot be serialized to JSON directly
// because of its ObjectId. This function converts a document
// with an ObjectId to a plain object with a string _id.
export const toPlainDocument = <T extends { _id: ObjectId }>(
  documentWithId: T
) => {
  return { ...documentWithId, _id: documentWithId._id.toHexString() as string };
};
