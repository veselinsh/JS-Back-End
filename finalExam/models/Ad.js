const {Schema,model,Types:{ObjectId}} = require('mongoose');


const adSchema = new Schema({
    headline: {type:String,minlength:[4,'Headline must be at least 4 characters long'], required:true},
    location: {type:String,minlength:[8,'Location must be at least 8 characters long'],required:true},
    companyName: {type:String,minlength:[3,'Company name must be at least 3 characters long'],required:true},
    description: {type:String,maxlength:[40,'Description must be at most 40 characters long'],required:true},
    author: {type:ObjectId,ref:'User',required:true},
    applied: {type:[ObjectId],ref:'User',default:[]},
});

const Ad = model('Ad',adSchema);
module.exports = Ad