import { Context as _ctx } from 'koa';

let postId = 1;

const posts = [
  {
    id: 1,
    title: 'Title',
    body: 'Contents',
  },
];

export const write = (ctx: _ctx) => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

export const list = (ctx: _ctx) => {
  ctx.body = posts;
};

export const read = (ctx: _ctx) => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post exists.',
    };
    return;
  }
  ctx.body = post;
};

export const remove = (ctx: _ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post exists.',
    };
    return;
  }
  posts.splice(index, 1);
  ctx.status = 204;
};

export const replace = (ctx: _ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post exists.',
    };
    return;
  }

  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

export const update = (ctx: _ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'No post exists',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
