

const mongoose = require('mongoose');

mongoose.connect("your db connection string")
.then(()=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.log(err);
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:20,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    }

},{timestamps:true});


// const accountSchema = new mongoose.Schema({
//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"user",
//         required:true,
//     },
//     balance:{
//         type:Number,
//         required:true,
//     }
// },{timestamps:true});

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    userFirstName:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        required:true,
    }
},{timestamps:true});


const userModel = mongoose.model("user",userSchema);
const accountModel = mongoose.model("account",accountSchema);
module.exports = {
    userModel,
    accountModel,
}