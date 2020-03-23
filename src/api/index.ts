import Router from 'koa-router';
const api = new Router();

api.get('/test', ctx => {
  ctx.body = 'test success';
});

export default api;
