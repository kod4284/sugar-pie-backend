import Router from 'koa-router';
import posts from '@/api/posts';
import auth from '@/api/auth';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

export default api;
