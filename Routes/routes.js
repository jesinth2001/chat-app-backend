const router = require('express').Router();
const {register,login,setAvatar,getAllUsers} =require("../Controllers/controller");
const {sendMessage,getAllMessages} = require("../Controllers/messageController");


router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)
router.get('/getAllUsers/:id',getAllUsers)
router.post('/sendMessage',sendMessage)
router.post('/getAllMessages',getAllMessages)

module.exports = router;