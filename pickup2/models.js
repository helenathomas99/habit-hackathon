let mongoose  = require('mongoose');
let Schema = mongoose.Schema;

//contact model
let UserSchema = new Schema({
    username: String,
    password: String,
    score: Number
});

const User =  mongoose.model('User', UserSchema)




module.exports = {
  User: User
}
