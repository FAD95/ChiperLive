
const Model = require('./model');


 
function addMessage(message){
  const myMessage = new Model(message);
    myMessage.save();
}

 async function getMessages(filterChat){
   
    return new Promise((resolve,reject)=>{
      let filter = {}; 
  if (filterChat !== null){
      filter = {"chat": filterChat }
  }
    Model.find(filter)
    .populate('user')
    .exec((error,populated)=>{
      if (error){ 
      reject(error)
      return false;
    }else{
     resolve(populated);
    }
    })
      
     
    })
    
  }

  async function updateText(id,message,user){
    const foundMessage = await Model.findOne({
      _id:id
    })

    if(user!= null) {
      foundMessage.user = user;
    }
    foundMessage.message = message;
   
    const newMessage = await foundMessage.save();
    return newMessage
  }
  
  function removeMessage(id){
    const deleted = Model.deleteOne({
       _id :id
     })

     return deleted;
  }
module.exports= {
    add: addMessage,
    list: getMessages,
    update : updateText,
    remove :removeMessage
    //get
    //update
    //delete
}