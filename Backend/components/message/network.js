const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');
const multer = require('multer');
const config = require('../../config')

const upload = multer({
    dest:`public/${config.filesRoute}/`
})
router.get('/', (req,res)=>{
   const filterMessages = req.query.chat || null;
   console.log(`filterMessages ${filterMessages}`)
   controller.getMessages(filterMessages)
   .then ((listaMensajes)=>{
        response.success(req,res,listaMensajes,200);
   })
   .catch(e=>{
    response.error(req,res,'Unexpected error',500,e);
   })
   
})

router.post('/', upload.single('file'),(req,res)=>{
     
    controller.addMessage(req.body.chat,req.body.user,req.body.message,req.file)
    .then ((MensajeCompleto)=>{
         response.success(req,res,MensajeCompleto,201);
    })
    .catch(e=>{
     response.error(req,res,'Unexpected error',500,e);
    })
    
 })
 

router.patch('/:id',function(req,res){
    console.log(req.params.id);
     
    controller.updateMessage(req.params.id,req.body.message,req.body.user)
    .then ((data)=>{
        response.success(req,res,data,200);
    })
    .catch(e=>{
        response.error(req,res,'Unexpected error',500,e);
       })
       
   
})
     
router.delete('/:id', function(req,res){
    controller.deleteMessage(req.params.id)
    .then(()=>{
        response.success(req,res,`usuario ${req.params.id} eliminado`,200);
    })
    .catch(e=>{
     response.error(req,res,'Unexpected error',500,e);
    })
    
 })

module.exports = router;
