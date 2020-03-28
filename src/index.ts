import 'module-alias/register';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import api from '@/api';

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port 4000');
});
