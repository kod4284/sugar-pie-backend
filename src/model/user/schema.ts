import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password: string) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.generateToken = function () {
  // IMPORTANT: you should use your own secret in .env file
  const secret = process.env.JWT_SECRET || '3181b72e69cabb1761330fce6d0d00ced5957be396294a6cfc53d9990045b6389390e90a375088aa95eb5dd8fbd9d7ddbed13f6b6c164d99777cd5b46aa5186c';
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    secret,
    {
      expiresIn: '7d',
    }
  );
  return token;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.statics.findByUsername = function (username: string) {
  return this.findOne({ username });
};

export default UserSchema;
