import { Context as _ctx } from 'koa';

const checkLoggedIn = (ctx: _ctx, next: Function) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

export default checkLoggedIn;
