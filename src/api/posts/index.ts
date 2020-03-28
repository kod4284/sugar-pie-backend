import Router from 'koa-router';
import {
  list,
  write,
  read,
  remove,
  replace,
  update
} from '@/api/posts/posts.ctrl';

const posts = new Router();
posts.get('/', list);
posts.post('/', write);
posts.get('/:id', read);
posts.delete('/:id', remove);
posts.put('/:id', replace);
posts.patch('/:id', update);

export default posts;
