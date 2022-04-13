const router = require('koa-router')()
const DB = require('../module/db.js'); //引入db
router.prefix('/shop')
// 引入User
const Shop = require('../models/Shop');
const fs = require("fs");

function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}

// POST@/upload
router.post(
    "/insert",
    async (ctx) => {
        try {
            // 获取上传文件
            const files = ctx.request.files.files;
            let newShop = null;
            let filesA = []
            // 正则 替换掉文件原始路径中不需要的部分
            const reg = new RegExp(".*/public/", "g");
            if (files?.length >= 1) {
                console.log(files)
                for (let fileKey in files) {
                    filesA[fileKey] = {
                        name: files[fileKey].name,
                        url: files[fileKey].path.replace(reg, ""),
                    }
                }
            } else {
                
                filesA[0] = {
                    name: files.name,
                    url: files.path.replace(reg, ""),
                }
            }
            newShop = new Shop({
                name: ctx.request.body.name,
                title: ctx.request.body.title,
                money: ctx.request.body.money,
                parameter: ctx.request.body.parameter,
                BriefIntroduction: ctx.request.body.BriefIntroduction,
                classificationId: ctx.request.body.classificationId,
                classificationName: ctx.request.body.classificationName,
                cover: filesA
            });
            await newShop.save().then(user => {
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

        } catch (error) {
            console.log(error)
            ctx.status = 400;
            ctx.body = { code: 400, msg: "上传失败", data: { error } };
        }
    }
);

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
    const findResult = await Shop.find(data);
    // 判断差没查到
    if (findResult.length == 0) {
        ctx.status = 201;
        ctx.body = [];
    } else {
        ctx.status = 200;
        ctx.body = findResult;
    }
})

router.get('/find', async ctx => {
    let data = { _id: ctx.query._id };
    if (!ctx.request.query._id) {
        data = null
    }
    // 查询
    const findResult = await Shop.find(data);
    // 判断差没查到
    if (findResult.length == 0) {
        ctx.status = 201;
        ctx.body = [];
    } else {
        ctx.status = 200;
        ctx.body = findResult;
    }
})
router.get('/ByShopnameFind', async ctx => {
   // const findstr={username：new RegExp(ctx.query.search)}//new RegExp(ctx.request.body.input)会将input的值改写为匹配/input/，即正则表达式的方式

    let data = { title:new RegExp(ctx.query.search) };
    if (!new RegExp(ctx.query.search)) {
        data = null 
    }
    // 查询
    const findResult = await Shop.find(data);
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
    const find = await Shop.find(data);
    const regtwo = new RegExp("(?<=[0-9]/).*", "g");
    if(find?.cover!=undefined){
        let dir = find.cover[0]?.url?.replace(regtwo, "")
        delDir(`public/${dir}`)
    }
   
    // 查询
    const findResult = await Shop.remove(data);
    // 判断差没查到
    if (findResult.length == 0) {
        ctx.status = 201;
        ctx.body = { onerror: 1, msg: '此商品不存在!' };
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
    let data = {
        classification: ctx.request.body.classification,
        BriefIntroduction: ctx.request.body.BriefIntroduction,
        parameter: ctx.request.body.parameter,
        money: ctx.request.body.money,
        title: ctx.request.body.title,
        classificationId: ctx.request.body.classificationId,
        classificationName: ctx.request.body.classificationName,
    }
    // 查询
    Shop.updateOne(id, data, (err, res) => {
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
 * @route POST api/users/find
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.get('/findClassShop', async ctx => {
    let data = { classificationId: ctx.query._id };
    // 查询
    const findResult = await Shop.find(data);
    // 判断差没查到
    if (findResult.length == 0) {
        ctx.status = 201;
        ctx.body = [];
    } else {
        ctx.status = 200;
        ctx.body = findResult;
    }
})

module.exports = router