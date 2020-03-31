import jwt from 'jsonwebtoken';
import { Context as _ctx } from 'koa';

interface UserInfo {
  _id: string,
  username: string | object
}

const jwtMiddleware = (ctx: _ctx, next: Function) => {
  const token = ctx.cookies.get('access_token');
  if (!token) {
    return next();
  }
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET does not exist');
    }
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === 'string') return;

    const { _id, username } = decoded as UserInfo;
    ctx.state.user = {
      _id,
      username,
    };
    console.log(decoded);
    return next();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return next();
  }
};

export default jwtMiddleware;