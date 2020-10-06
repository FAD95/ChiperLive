const statusMessages = {
  200: 'Done',
  201: 'Created',
  400: 'Invalid format ',
  500: 'Internal error'
}
exports.success = function (req, res, message, status) {
  const statusCode = status
  let statusMessage = message
  if (!status) {
    status = 200
  }
  if (!message) {
    statusMessage = statusMessages[status]
  }
  res.status(statusCode).send({
    error: '',
    // body: statusMessages});
    body: message
  })
}

exports.error = function (req, res, message, status, details) {
  console.error(`[response error] ${details}`)

  if (!status) {
    status = 500
  }
  if (!message) {
    message = 'Error inesperado en el servidor'
  }

  res.statusMessage = message
  res.status(status).end()
}
