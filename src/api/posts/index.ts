import Router from 'koa-router';
import {
  list,
  write,
  read,
  remove,
  update,
  getPostById,
  checkOwnPost,
} from '@/api/posts/posts.ctrl';
import checkLoggedIn from '@/lib/checkLoggedIn';

const posts = new Router();
posts.get('/', list);
posts.post('/', checkLoggedIn, write);

const post = new Router();
post.get('/', read);
post.delete('/', checkLoggedIn, checkOwnPost, remove);
post.patch('/', checkLoggedIn, checkOwnPost, update);

posts.use('/:id', getPostById, post.routes());

export default posts;
