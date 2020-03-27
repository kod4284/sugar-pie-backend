import { Context as _ctx } from 'koa';
import Router from 'koa-router';
const posts = new Router();

const printInfo = (ctx: _ctx) => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.get('/', printInfo);
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.put('/:id', printInfo);
posts.patch('/:id', printInfo);

export default posts