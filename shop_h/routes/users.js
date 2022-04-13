const router = require('koa-router')()
const DB = require('../module/db.js'); //引入db
router.prefix('/users')

const Shop = require('../models/Shop');


// 引入User
const User = require('../models/User');

/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/', async ctx => {
  ctx.status = 200; 
  ctx.body = { msg: 'users works...' }; 
});

/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/register', async ctx => {

  // 通过手机号判读是否注册过
  const findResult = await User.find({ phone: ctx.request.body.phone });
  console.log(findResult);
  if (findResult.length > 0) {
    ctx.status = 203;
    ctx.body = { onerror: 1, msg: '手机号已被占用 ' };
  } else {
    // 没查到
    const newUser = new User({
      name: ctx.request.body.name,
      phone: ctx.request.body.phone,
      password: ctx.request.body.password
    });


    // 存储到数据库
    await newUser.save().then(user => {
      // 返回token
      ctx.status = 200;
      // 返回json数据
      ctx.body = {
        onerror: 0,
        msg: '注册成功'
      };
    }).catch(err => {
      console.log(err);
    });


  }
});
/**
 * @route POST api/users/login
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
  // 查询
  let findResult = await User.find({ phone: ctx.request.body.phone });
  findResult.length == 0 ? findResult = await User.find({ name: ctx.request.body.phone }) : ''
  const user = findResult[0];
  const password = ctx.request.body.password;
  // 判断差没查到
  if (findResult.length == 0) {
    ctx.status = 201;
    ctx.body = { onerror: 1, msg: '用户不存在!' };
  } else {
    // 查到后 验证密码
    var result = (password == user.password)
    // 校验通过
    if (result) {
      // 返回token
      ctx.status = 200;
      ctx.body = {
        onerror: 0,
        data: findResult[0],
        msg: '登录成功!'
      };
    } else {
      ctx.status = 202;
      ctx.body = { onerror: 1, msg: '密码错误!' };
    }
  }
})
/**
 * @route POST api/users/find
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.get('/find', async ctx => {
  let data = { _id: ctx.query._id };
  if (!ctx.request.query._id) {
    data = null
  }
  // 查询
  const findResult = await User.find(data);
  // 判断差没查到
  if (findResult.length == 0) {
    ctx.status = 201;
    ctx.body = [];
  } else {
    ctx.status = 200;
    ctx.body = findResult;
  }
})
/**
 * @route POST api/users/find
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.get('/remove', async ctx => {
  let data = { _id: ctx.query._id };
  if (!ctx.request.query._id) {
    data = null
  }
  // 查询
  const findResult = await User.remove(data);
  // 判断差没查到
  if (findResult.length == 0) {
    ctx.status = 201;
    ctx.body = { onerror: 1, msg: '用户不存在!' };
  } else {
    ctx.status = 200;
    ctx.body = {
      onerror: 0,
      msg: '删除成功'
    };
  }
})
/**
 * @route POST api/users/update
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.post('/update', async ctx => {
  let id = { _id: ctx.request.body._id };
  let data = ctx.request.body
  let acknowledged = false
  // 查询
  User.updateOne(id, data, (err, res) => {
    if (err) {
      console.log(err)
    } else {

      acknowledged = res.acknowledged

    }
  })

  ctx.status = 200;
  ctx.body = {
    onerror: 0,
    msg: '更新成功'
  };


})
/**
 * @route POST api/users/update
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.get('/UpdatecardList', async ctx => {
  let Userid = { _id: ctx.query.Userid };
  let Shopid = { _id: ctx.query.Shopid };
  let newcard;
  try {
    //找到商品信息
    let userdata = User.findOne(Userid, (err, goodsDoc) => {
      let ishave = false
      for (let v in goodsDoc.cardList) {
        if (goodsDoc.cardList[v]._id == ctx.query.Shopid) {
          ishave = true;
          goodsDoc.cardList[v].ShopCont++
        }
      }
      if (ishave == true) {
        User.updateOne(Userid, goodsDoc, (err, res) => {
          if (err) {

          } else {
            ctx.status = 200;
            ctx.body = {
              onerror: 0,
              msg: '更新成功'
            };

          }
        })
      } else {
         newcard = { ...goodsDoc }
        if (goodsDoc._doc.cardList== {}) {
          newcard = {
            cardList: {[ctx.query.Shopid]:{
              _id: ctx.query.Shopid,
              ShopCont: 1
            }}
          }
        } else {
          newcard = {
            cardList: {...goodsDoc._doc.cardList, [ctx.query.Shopid]:{
              _id: ctx.query.Shopid,
              ShopCont: 1
            }
          }
          }
        }

 
      }
      User.updateOne(Userid, newcard, (err, res) => {
        if (err) {
          console.log(err)
        } else {
    
          acknowledged = res.acknowledged
    
        }
      })
    })
    ctx.status = 200;
    ctx.body = {
      onerror: 0,
      msg: '加入购物车成功'
    };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = {
      onerror: 1,
      msg: '错误'
    };
  }

})
module.exports = router
