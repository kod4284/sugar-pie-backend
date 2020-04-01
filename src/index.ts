import 'module-alias/register';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import 'dotenv/config';

import api from '@/api';
import jwtMiddleware from '@/lib/jwtMiddleware';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI || 'mongodb://localhost:27017/default', {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  })
  .catch((e: Error) => {
    // eslint-disable-next-line no-console
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port %d', port);
});
