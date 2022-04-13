const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// 实例化数据模板
const UserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  ShopList: {
    type: Array,
    required: true
  },
  UserFromInfo: {
    type: Object,
    require: true
  },
  SubmitTime:{
    type: String,
    default: new Date().toString()
  },
  PaymentTime:{
    type: String,
  },
  OrderState:{
    type:Boolean,
    require:true
  },
  Money:{
    type:Number,

  }
});
 
module.exports = User = mongoose.model('order', UserSchema);