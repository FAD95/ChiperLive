import { useRef, memo } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import setAuth from '../src/redux/actions/setAuth'
import { useRouter } from 'next/router'

import useAuth from '../src/hooks/useAuth'

import Head from '../src/components/head'
import Button from '../src/components/Button'

import login from '../src/axios/login'

const Login = memo(() => {
  const email = useRef()
  const password = useRef()

  const dispatch = useDispatch()
  const router = useRouter()

  const [logged] = useAuth('/login')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login({
        email: email.current.value,
        password: password.current.value,
      })
      dispatch(
        setAuth({
          status: true,
          token: response.data.token,
          email: email.current.value,
        })
      )
      router.push('/')
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    !logged && (
      <>
        <Head title='Chiper Live | Iniciar Sesión' />
        <div id='container'>
          <form action='submit' onSubmit={handleSubmit}>
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
            <Button type='submit'>Iniciar Sesión</Button>
            <p>¿No tienes una cuenta?</p>
            <Link href='/join'>
              <a>Crear Cuenta</a>
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
            padding: 30px 20px;
          }
          h1 {
            font-size: 18px;
            margin-top: 20px;
            color: white;
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

export default Login
