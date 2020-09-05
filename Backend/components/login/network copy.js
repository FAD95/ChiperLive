const express = require('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const {seedJwt,tokenCaducidad} =require('../../config');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller.js')


router.get('/', (req,res)=>{
    const filterUser = req.body.email || null;
    const password = req.body.password || null;
    
    if (filterUser){
    controller.getUser(filterUser)
    .then ((data)=>{
         console.log(data)
         
        if (!data)  return response.error(req,res,'Usuario o contraseña incorrecta',500,'No definido');
        

        bcrypt.compare(password, data.password)
            .then(match => {
                    if(match){

                        payload = {
                            correo : data.correo
                        }
                        jwt.sign(payload,seedJwt, (error,token)=>{
                            if(error) return response.error(req,res,'internal error',500,error)

                            response.success(req,res,token,201);
                        })
                       
                    }else {
                    response.error(req,res,'Usuario o contraseña incorrecta',500,e)
                    }
            }).catch (e =>
                response.error(req,res,'internal error',500,e)
               ) 

               
      
         

        
       
    })
    .catch(e=>{
     response.error(req,res,'Unexpected error',500,e);
    })
   
    } else {
        response.error(req,res,'Debe filtrar por un correo',500,null);
    }
    
 })

module.exports = router;