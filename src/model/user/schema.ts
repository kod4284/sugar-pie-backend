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
  const secret = process.env.JWT_SECRET;
  try {
    if (!secret) {
      throw new Error('JWT_SECRET does not exist');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return;
  }
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
