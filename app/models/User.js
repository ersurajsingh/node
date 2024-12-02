const mongoose = require('mongoose');
const { emit } = require('process');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    showroomname : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;