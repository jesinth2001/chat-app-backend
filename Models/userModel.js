const mongoose = require('mongoose')
const userSchema=new mongoose.Schema({

    username: 
    {
     type:'string',
     required:[true,"username is required"]
    },
    email:{
        type:'string',
        required:[true,"email is required"],
        unique: true
    },
    password:{
        type:'string',
        required:[true,"password is required"]
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
         type:String,
         default:"" 
    }
    
})

module.exports=mongoose.model('Users',userSchema)