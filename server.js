const express = require('express')
const cors = require('cors')
const mongo = require('mongoose')
const routers = require("./Routes/routes")
const socket = require('socket.io')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/',routers);
mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Remove this line, as it's deprecated
    useUnifiedTopology: true, // Remove this line, as it's deprecated
  
  }).then(() => {
    console.log('DB connected successfully');
  }).catch(err => {
    console.error('Error connecting to db:', err);
  });

const server= app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.port}`);
})


/* socket configuration*/

const io= socket(server,{
  cors: {
    origin:'http://localhost:3000',
    credentials:true,
  }
})

global.onlineUsers=new Map();
io.on('connection',(socket) => {
  global.chatSocket=socket;
  socket.on('add-user',(userId)=>{
    onlineUsers.set(userId,socket.id);
  });

  socket.on('send-msg',(data)=>{
 
    const sender=onlineUsers.get(data.to);
    if(sender){
      socket.to(sender).emit("msg-received",data.message);
    }
  });

})