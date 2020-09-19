import { useRef, memo } from 'react'
import Link from 'next/link'
import axios from 'axios'

import useAuth from '../src/hooks/useAuth'

import Head from '../src/components/head'
import Button from '../src/components/Button'

const Join = memo(() => {
  const email = useRef()
  const password = useRef()

  const [logged] = useAuth('/join')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(process.env.SERVER + '/signup', {
        email: email.current.value,
        password: password.current.value,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    !logged && (
      <>
        <Head title='Chiper Live | Crear Cuenta' />
        <div id='container'>
          <form action='submit' onSubmit={handleSubmit}>
            <h1>Crear Cuenta</h1>
            <div className='input-container'>
              <input ref={email} type='email' placeholder='e-mail' required />
            </div>
            <div className='input-container'>
              <input
                ref={password}
                type='password'
                placeholder='Contraseña'
                required
              />
            </div>
            <Button type='submit'>Aceptar</Button>
            <p>¿Ya tienes una cuenta?</p>
            <Link href='/login'>
              <a>Iniciar Sesión</a>
            </Link>
          </form>
        </div>
        <style jsx>{`
          #container {
            margin-top: 10vh;
            display: flex;
            justify-content: center;
            text-align: center;
          }

          form {
            transform: skew(1deg, 0deg);
            background: #ed213a; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #93291e,
              #ed213a
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #93291e,
              #ed213a
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            max-width: 80vw;
            width: 400px;
            border-radius: 10px;
            padding: 20px 20px;
          }
          h1 {
            font-size: 18px;
            margin-top: 20px;
            color: #d4c437;
            color: white;
            margin-bottom: 30px;
          }
          .input-container {
            margin-top: 1em;
            width: 100%;
          }
          input {
            width: 100%;
            border-radius: 15px;
            height: 40px;
            padding: 0 20px;
          }
          p {
            margin-top: 10px;
            color: white;
          }
          a {
            margin-left: 10px;
            color: orange;
          }
        `}</style>
      </>
    )
  )
})

export default Join
