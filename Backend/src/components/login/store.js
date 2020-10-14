const Model = require('../user/model')

function addUser(user) {
  const myUser = new Model(user)
  return myUser.save()
}

async function getUser(filterUser) {
  let filter = {}
  if (filterUser !== null) {
    filter = { email: filterUser }
  }

  const users = await Model.findOne(filter, 'correo password')

  return users
}

async function updateUser(id, name) {
  const foundUser = await Model.findOne({
    _id: id,
  })

  foundUser.name = name

  const UpdatedUser = await foundUser.save()
  return UpdatedUser
}

/* function removeMessage(id){
    const deleted = Model.deleteOne({
       _id :id
     })

     return deleted;
  }
  */
module.exports = {
  list: getUser,
  addUser,
  update: updateUser,
  //delete
}
