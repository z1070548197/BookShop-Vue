const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
//const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const classs = require('./routes/class')
const shop = require('./routes/shop')
const order = require('./routes/order')
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const path = require("path");
const fs = require("fs");
const { format } = require("date-fns"); // npm i date-fns
app.use(require('koa-static')(__dirname + '/public'))
// error handler
onerror(app)




 
 
 


app.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'utf-8',
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => { // 文件上传前的设置
      // 无论是多文件还是单文件上传都会重复调用此函数
      // 最终要保存到的文件夹目录
      const dirName = format(new Date(), "yyyyMMddhhmmss");
      const dir = path.join(__dirname, `public/upload/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      // 文件名称去掉特殊字符但保留原始文件名称
      const fileName = file.name
      file.name = fileName;
      // 覆盖文件存放的完整路径(保留原始名称)
      file.path = `${dir}/${fileName}`;
    },
  }
}));

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      if (ctx.url === '/login') {
        return '*'; // 允许来自所有域名请求
      }
      return '*'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
  })
);

// middlewares
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(classs.routes(), classs.allowedMethods())
app.use(shop.routes(), shop.allowedMethods())
app.use(order.routes(), order.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
