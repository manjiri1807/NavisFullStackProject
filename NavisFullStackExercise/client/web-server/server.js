// libs
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = new Koa();
app.use(cors());
const router = new Router();

const PORT = process.env.PORT || 3016;
const DIST_ROOT = `/dist/dev`;

console.log(`Serving bundle on port ${PORT}`);

router.get(`${DIST_ROOT}/:filename`, async (ctx, next) => {
  console.log('router.get filename')
  ctx.response.lastModified = new Date();
  ctx.body = fs.createReadStream(__dirname + `${DIST_ROOT}/${ctx.params.filename}`);
});

router.get(`${DIST_ROOT}/images/:filename`, async (ctx, next) => {
  console.log('router.get images')
  ctx.response.lastModified = new Date();
  ctx.body = fs.createReadStream(__dirname + `${DIST_ROOT}/images/${ctx.params.filename}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.protocol} ${ctx.method} ${ctx.url} (${ms}ms)`);
});

// start server
http.createServer(app.use(router.routes()).use(router.allowedMethods()).callback()).listen(PORT);
