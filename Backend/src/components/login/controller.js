const store = require('./store')

function getUser(filterUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await store.list(filterUser)
      resolve(user)
    } catch (error) {
      reject('Usuario inexistente')
      console.error(error)
    }
  })
}

function addUser(user) {
  const users = {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password,
    city: user.city,
    role: user.role,
  }
  return store.addUser(users)
}

function updateUser(id, user) {
  return new Promise(async (resolve, reject) => {
    if (!id || !user) {
      reject('Invalid data')
      return false
    } else {
      const result = await resolve(store.update(id, user))
      return result
    }
  })
}
module.exports = {
  getUser,
  addUser,
  updateUser,
}
