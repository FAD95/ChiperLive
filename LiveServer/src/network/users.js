const users = []

const addUser = (id) => {
  const existingUser = users.find((user) => user.id === id)

  if (existingUser) {
    return { error: 'Ya existe una transmision con el mismo ID' }
  }

  const user = id
  users.push(user)
  console.log(users)

  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => users.find((user) => user.id === id)

module.exports = {
  addUser,
  removeUser,
  getUser,
}
