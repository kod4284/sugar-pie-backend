import { model, Model } from 'mongoose';
import UserSchema from '@/model/user/schema';
import { UserDocument } from '@/model/user/document';

// document
export interface IUserDocument extends UserDocument {
  // also we can declare methods here
  checkPassword(password: string): Promise<boolean>,
  setPassword(password: string): Promise<void>,
  serialize(): JSON,
  generateToken(): string,
}

// model
export interface UserModel extends Model<IUserDocument> {
  // here we decalre statics
  findByUsername(username: string): Promise<IUserDocument>
}

export default model<IUserDocument, UserModel>('User', UserSchema);
