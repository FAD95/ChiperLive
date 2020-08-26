const store = require('./store');
//const socket = require('../../socket').socket;
const config = require('../../config');

function addMessage(chat,user,message,file){
     return new Promise((resolve,reject)=>{ 
        
     if (!chat || !user || !message){
         console.error('[message controller] no hay usuario o mensaje');
         return reject('Datos Incorrectos');
     }   

     let fileUrl = '';
     if (file){
         //fileUrl='http://localhost:3000/app/files/'+file.filename;
         fileUrl =`${config.host}:${config.port}${config.publicRoute}/files/${file.filename}`
     }
     const fullMessage={
         "chat":chat,
         "user":user,
         "message":message,
         "date" : new Date(),
         "file":fileUrl
    };
     
    store.add(fullMessage);

    /*socket.io.emit('message',fullMessage);
    resolve(fullMessage);*/
})
}

function getMessages(filterUser){
    return new Promise((resolve,reject)=>{
       resolve(store.list(filterUser));
    })
}

 function updateMessage(id,message,user){
  return new Promise(async(resolve,reject) => {
    if (!id || !message){
        reject('Invalid data')
        return false; 
    }
     const result = await store.update(id,message,user);
     resolve(result);
    
  })
}

function deleteMessage(id){
    return new Promise((resolve,reject)=>{
        if (!id){
            reject('Id invalido');
            return false;
        }
        store.remove(id)
          .then (()=>{
            resolve();
          })
          .catch(e=>{
              reject(e);
              return false;
          })
        
    })
}
module.exports ={
     addMessage,
     getMessages,
     updateMessage,
     deleteMessage
}