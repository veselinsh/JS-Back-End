const {Schema,model,Types:{ObjectId}} = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-z]+)@([a-zA-z]+)\.([a-zA-z]+)$/
//TODO add validation
const userSchema = new Schema({
    email: { type: String, required: [true,'Email is required.'],validate:{
        validator(value){
            return EMAIL_PATTERN.test(value);
           },
           message: 'Email must be valid and contain only english letters.'
    }},
    hashedPassword: {type:String,minlength:[5,'Password must be at least 5 characters long'], required:true},
    skills: {type:String,maxlength:[40,'Description of skills must be at most 40 characters lonh.'], required:true},
    myAds: {type:[ObjectId],ref:'Ad',default:[]},
});
userSchema.index({email:1},{
    unique:true,
    collation:{
        locale:'en',
        strength:2
    }
})

const User = model('User',userSchema);
module.exports = User;