
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    id : Number,
    phone: Number,
    bonus_points: Number,
    username: String,
    email: String,
    gender: String,
}, {collection: 'users'});

//module.exports = mongoose.model('user', userSchema);

var User = mongoose.model('user', userSchema);

module.exports.get = async function(){
  try {
      var users = await User.find();
      return users;
  } catch(err) {
      throw new Error(err);   
  }        
}

module.exports.getById = async function(userId){
  try {
      var user = await User.findOne({"id": userId});
      return user;
  } catch(err) {
      throw new Error(err);   
  }        
}

module.exports.getByUserName = async function(userName){
  try {
      var user = await User.findOne({"username": userName});
      return user;
  } catch(err) {
      throw new Error(err);
  }        
}

module.exports.updateUserByUserName = async function(userName, data){
  try {
      var filter = {"username": userName};
      var doc = await User.findOneAndUpdate(filter, data, {
        new: true
      });
      return doc;
  }catch(err) {
      throw new Error(err);
  }
}