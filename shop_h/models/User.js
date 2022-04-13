const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// 实例化数据模板
const UserSchema = new Schema({
  name: {
    type: String,
    default:'狗蛋'
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  cardList:{
    type: Object,
}
});
 
module.exports = User = mongoose.model('users', UserSchema);