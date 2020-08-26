const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');


router.post('/', (req,res)=>{
   const users = req.body.users;
    console.log('recibiendo solicitud post')
    controller.addData(users)
     .then((data)=>{
         response.success(req,res,data,201);
     })
     .catch(e=>{
        response.error(req,res,'Internal error',500,e);
     })
})

router.get('/:userId', (req,res)=>{
   const filter = req.params.userId || null;
   
   controller.getData(filter)
   .then ((data)=>{
        response.success(req,res,data,200);
   })
   .catch(e=>{
    response.error(req,res,'Unexpected error',500,e);
   })
   
})
 
module.exports = router;
