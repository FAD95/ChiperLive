
const Model = require('./model');


 
function addUser(user){
  const myUser = new Model(user);
   return myUser.save();
}

 async function getUser(filterUser){
    let filter = {}; 
  if (filterUser !== null){
      filter = {"name": filterUser }
  }
    const users = await Model.find(filter);
    console.log(json(users.nombres))
    
    console.log(data)
    return users;
  }

  
  async function updateUser(id,name){
    const foundUser = await Model.findOne({
      _id:id
    })

    
    foundUser.name = name;
   
    const UpdatedUser = await foundUser.save();
    return UpdatedUser
  }
  
 /* function removeMessage(id){
    const deleted = Model.deleteOne({
       _id :id
     })

     return deleted;
  }
  */
module.exports= {
    list :getUser,
    addUser ,
    update: updateUser
    //delete
}