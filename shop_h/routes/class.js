const router = require('koa-router')()
const DB = require('../module/db.js'); //引入db
router.prefix('/class')
// 引入User
const Class = require('../models/Class');


/**
 * @route POST api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
router.post('/insert', async ctx => { 
    const findResult = await Class.find({ ClassName: ctx.request.body.ClassName });
 
    if (findResult.length > 0) {
        ctx.status = 203;
        ctx.body = { onerror: 1, msg: '分类名重复' };
    } else {
        // 没查到
        const newClass = new Class({
            ClassName: ctx.request.body.ClassName,
        });


        // 存储到数据库
        await newClass.save().then(user => {
            // 返回token
            ctx.status = 200;
            // 返回json数据
            ctx.body = {
                onerror: 0,
                msg: '添加成功'
            };
        }).catch(err => {
            console.log(err);
        });


    }
});
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
    const findResult = await Class.find(data);
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

    // 查询
    const findResult = await Class.remove(data);
    // 判断差没查到
    if (findResult.length == 0) {
        ctx.status = 201;
        ctx.body = { onerror: 1, msg: '此分类不存在!' };
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
    Class.updateOne(id, data, (err, res) => {
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
module.exports = router