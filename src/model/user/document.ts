import { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: String,
  hashedPassword: String,
}
