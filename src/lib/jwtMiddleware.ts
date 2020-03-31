import jwt from 'jsonwebtoken';
import { Context as _ctx } from 'koa';
import User from '@/model/user';

interface UserInfo {
  _id: string;
  username: string | object;
  iat: number;
  exp: number;
}

const reissueToken = async (ctx: _ctx, next: Function, decoded: UserInfo) => {
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
    console.log('d');
    const user = await User.findById(decoded._id);
    if (user === null) {
      throw new Error('Cannot find user information');
    }
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }
};

const jwtMiddleware = async (ctx: _ctx, next: Function) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    console.log('pass');
    return next();
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET does not exist');
    }

    const decoded = jwt.verify(token, secret) as UserInfo;
    if (typeof decoded === 'string') return;
    const { _id, username } = decoded;
    ctx.state.user = {
      _id,
      username,
    };

    await reissueToken(ctx, next, decoded);
    console.log(decoded);
    return next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return next();
  }
};

export default jwtMiddleware;
