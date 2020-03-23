import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
  ctx.body = 'home';
});

router.get('/about', ctx => {
  ctx.body = 'about';
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
