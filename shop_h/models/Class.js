const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// 实例化数据模板
const UserSchema = new Schema({
  ClassName: {
    type: String,
    required: true
  },
});
 
module.exports = Class = mongoose.model('class', UserSchema);