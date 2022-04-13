const router = require('koa-router')()
const common =require('../module/common.js')
const send = require('koa-send');

router.get('/d/:name', async (ctx, next) => {
  const name = ctx.params.name;
 const path = `public/upload/${name}`;
 ctx.attachment(path);
  await send(ctx, path);
})
router.post('/doAdd', async (ctx) => {
  // 原生node.js 在 koa 中获取表单提交的数据
  let data = await common.getPostData(ctx);
  console.log(data);
 
  ctx.body = data;
})
router.get('/string', async (ctx, next) => {
  // 从 ctx 中读取get传值
  // console.log(ctx.query); // 获取的是对象
  // console.log(ctx.querystring); // 获取的是一个字符串
  // console.log(ctx.url); // 获取url地址
  // console.log(ctx.session);// 获取session
  // ctx里面的 request 里面获取 get 传值
  // console.log(ctx.request.url);
  // console.log(ctx.request.query);
  // console.log(ctx.request.querystring);
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json' 
  }
})

module.exports = router
