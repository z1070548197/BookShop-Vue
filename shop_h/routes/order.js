const router = require('koa-router')()
const DB = require('../module/db.js'); //引入db
router.prefix('/order')



// 引入Order
const Order = require('../models/Order');

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
router.post('/EstablishOrder', async ctx => {

  //const findResult = await Order.find({ phone: ctx.request.body.phone });
  const newOrder = new Order({
    userId: ctx.request.body?.userId,
    userName: ctx.request.body?.userName,
    ShopList: ctx.request.body?.ShopList,
    UserFromInfo: ctx.request.body?.UserFromInfo,
    PaymentTime: ctx.request.body?.PaymentTime,
    OrderState: ctx.request.body?.OrderState,
    Money: ctx.request.body?.Money
  });
  // 存储到数据库
  await newOrder.save().then(user => {
    // 返回token
    ctx.status = 200;
    // 返回json数据
    ctx.body = {
      onerror: 0,
      data: user
    };
  }).catch(err => {
    console.log(err);
  });
});
/**

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
  const findResult = await Order.find(data);
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
 router.get('/findUser', async ctx => {
  let data = { userId: ctx.query.userid };
  if (!ctx.request.query.userid) {
    data = null
  }
  // 查询
  const findResult = await Order.find(data);
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
  const findResult = await Order.remove(data);
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
  console.log(data)
  // 查询
Order.updateOne(id, data, (err, res) => {
    // if (err) {
    //   console.log(err)
    // }
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
  let Orderid = { _id: ctx.query.Orderid };
  let Shopid = { _id: ctx.query.Shopid };
  let newcard;
  try {
    //找到商品信息
    let userdata = Order.findOne(Orderid, (err, goodsDoc) => {
      let ishave = false
      for (let v in goodsDoc.cardList) {
        if (goodsDoc.cardList[v]._id == ctx.query.Shopid) {
          ishave = true;
          goodsDoc.cardList[v].ShopCont++
        }
      }
      if (ishave == true) {
        Order.updateOne(Orderid, goodsDoc, (err, res) => {
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
        if (goodsDoc._doc.cardList.length == 0) {
          newcard = {
            cardList: [{
              _id: ctx.query.Shopid,
              ShopCont: 1
            }]
          }
        } else {
          newcard = {
            cardList: [...goodsDoc._doc.cardList, {
              _id: ctx.query.Shopid,
              ShopCont: 1
            }
            ]
          }
        }


      }
      Order.updateOne(Orderid, newcard, (err, res) => {
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
