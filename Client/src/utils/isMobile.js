// funcion que retorna la informacion del dispositivo
// si este corresponde con alguno de los dispositivos
// listados si no retorna null
const isMobile = () =>
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/BlackBerry/i)

export default isMobile
