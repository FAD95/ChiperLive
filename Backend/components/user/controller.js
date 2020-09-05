const store= require('./store');

function getUser(filterUser){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filterUser));
     })

    }
  
 function addUser(user){   
   
  const users={
       "nombres": user.nombres,
       "apellidos" : user.apellidos,
       "telefono":user.telefono,
       "correo" :user.correo,
       "password": user.password,
       "ciudad" : user.ciudad,
       "rol" : user.rol
   }
  return store.addUser(users);
 }

  function updateUser(id,user){
      return new Promise(async (resolve,reject)=>{
        if (!id || !user){
            reject('Invalid data')
            return false; 
        }else{
        const result = await resolve(store.update(id,user));
        return result;
      }
      })
  }
module.exports= {
  getUser,
  addUser,
  updateUser 

}