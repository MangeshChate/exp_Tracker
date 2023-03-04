const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

//categories => field => ['type':"color"]
const categories_model = new Schema({
  type: {
    type: String,
    default: 'Invesment',
  },
  color: { type: String, default: '#FCBE44' },
});

//transactions => field => [ "name","type" ,"amount" ,date]
const transactions_model = new Schema({
    name:{type:String,default:"Anonymeous"},
    type:{type:String,default:"Invesment"},
    amount:{type:Number}, 
    date:{type:Date,default:Date.now}   
});

const Categories =     mongoose.model("categories" , categories_model);
const Transaction =  mongoose.model("transaction" ,transactions_model);

exports.default = Transaction;
module.exports={
    Categories,
    Transaction
}