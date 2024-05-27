const messageModel=require("../Models/messageModel");
module.exports.sendMessage = async (req,res)=>{

    try{
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })

        return res.json(data);
    }
    catch(err){
        console.error(err);
    }
}
module.exports.getAllMessages = async (req,res)=>{
    try{
          const {from,to}=req.body;
          const message=await messageModel.find({
            users:{
                $all:[from,to],
            },
          }).sort({updatedAlt:1})

          const allMessage=message.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
                time:msg.updatedAt
            }
          })

          return res.json(allMessage)
    }
    catch(err){

    }
}