const handleExitSession = async () => {
  try {
    await localStorage.removeItem('state')
    window.location.replace('/login')
  } catch (error) {
    console.error(error)
  }
}
export default handleExitSession
