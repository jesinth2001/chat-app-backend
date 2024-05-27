const User=require('../Models/userModel')
const bcrypt=require('bcrypt')


const handleError =(err)=>
{
   
    let errors={email:"",password:"",username:""};
    if (err.code==11000)
    {
       errors.email="Email is already registered"; 
       return errors;
    }
    if(err.message==="Incorrect Password")
    {
     errors.password="The Password is incorrect";
     return errors;
    }
    if(err.message==="Incorrect Email")
    {
     errors.email="The Email Id is incorrect";
     return errors;
    }
    if(err.message==='Found User')
    {
      errors.username="UserName Already Exists";
      return errors;
    }

}

module.exports.login = async (req, res) => {
   try{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(user)
    {
         const isValidPassword =await bcrypt.compare(password, user.password)
         if(isValidPassword)
         {
            return res.json({loggedIn:true,user:user});
         }
         throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
   }
   catch(err){
       console.log(err)
       const errors=handleError(err)
       console.log(errors)
       return res.json({status:false,errors})
   }
}

module.exports.register = async(req,res)=>{

    try{
    const {username,email,password} = req.body;
    const encryptPassword =await bcrypt.hash(password,10) 
    const checkUserName=await User.findOne({username});
    if(!checkUserName){
      const user= await User.create(
         {
             email,
             username,
             password:encryptPassword,
         }
      )
        return res.json({status:true,user})
    }
    throw Error('Found User');
    
    }
    catch (err) {
       console.log(err)
       const errors=handleError(err)
       console.log(errors)
       return res.json({status:false,errors})
    }
    
}

module.exports.setAvatar =async(req,res)=>{
   try {
      const userId=req.params.id;
      const avatarImage=req.body.avatarImage;
      const userData= await User.findByIdAndUpdate(userId,{isAvatarImageSet:true,avatarImage})
      console.log(userId)
      return res.json({isSet:userData.isAvatarImageSet,avatarImage:userData.avatarImage})
   }
   catch (err) {

   }
}

module.exports.getAllUsers = async(req,res)=>{
   try{
    const users= await User.find({_id:{$ne:req.params.id}}).select(
      [
         "username",
         "email",
         "avatarImage",
         "_id",
      ]
    )
    return res.json(users)
   }
   catch (err) {

   }
}