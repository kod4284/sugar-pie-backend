import Router from 'koa-router';
import {
  list,
  write,
  read,
  remove,
  update,
  getPostById,
} from '@/api/posts/posts.ctrl';
import checkLoggedIn from '@/lib/checkLoggedIn';

const posts = new Router();
posts.get('/', list);
posts.post('/', checkLoggedIn, write);

const post = new Router();
post.get('/', read);
post.delete('/', checkLoggedIn, remove);
post.patch('/', checkLoggedIn, update);

posts.use('/:id', getPostById, post.routes());

export default posts;
