import Router from 'koa-router';
import {
  list,
  write,
  read,
  remove,
  update
} from '@/api/posts/posts.ctrl';

const posts = new Router();
posts.get('/', list);
posts.post('/', write);
posts.get('/:id', read);
posts.delete('/:id', remove);
posts.patch('/:id', update);

export default posts;
