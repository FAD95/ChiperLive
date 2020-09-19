const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');


const passport = require('passport')

router.get('/',passport.authenticate('jwt',{session :false})  ,(req,res)=>{
    const filterUser = req.query.user || null;
    
    controller.getUser(filterUser)
    .then ((data)=>{
       
         response.success(req,res,data,200);
    })
    .catch(e=>{
     response.error(req,res,'Unexpected error',500,e);
    })
    
 })
 
router.post('/', function(req,res) {
    const data = req.body;
     console.log(data)
    controller.addUser(data)
     .then((data)=>{
         response.success(req,res,data,201);
     })
     .catch(err=>{
         response.error(req,res,'Internal error',500,err);
     })
})

router.patch('/:id', function(req,res){
    const id = req.params.id;
    const user= req.body.name;
    controller.updateUser(id,user)
    .then((data)=>{
        response.success(req,res,data,200);
    })
    .catch(e=>{
        response.error(req,res,'Internal error Updated',500,e);
    })
})
module.exports = router;