const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 实例化数据模板
const UserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    money: {
        type: String,
        default: 0,
        required: true
    },
    parameter: { //参数
        type: String,
    },
    BriefIntroduction: { //简介
        type: String,
        required: true
    },
    classificationId: { //分类Id
        type: String,
        default:''
    },
    classificationName: { //分类Name
        type: String,
        default:''
    },
    cover:{
        type: Array,
        default:''
    }
});

module.exports = Shop = mongoose.model('shop', UserSchema);