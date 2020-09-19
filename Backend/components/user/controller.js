const store = require('./store')

function getUser(filterUser) {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser))
  })
}

function addUser({ names, lastNames, phone, email, password, city, role }) {
  const users = {
    names,
    lastNames,
    phone,
    email,
    password,
    city,
    role,
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
