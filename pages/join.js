import { useRef, memo, useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

import useAuth from '../src/hooks/useAuth'

import Head from '../src/components/head'
import Button from '../src/components/Button'

import ColombiaCiudades from '../src/lists/ColombiaCiudades.json'
import ColombiaDepartamentos from '../src/lists/ColombiaDepartamentos.json'
import MexicoCiudades from '../src/lists/MexicoCiudades.json'
import MexicoEstados from '../src/lists/MexicoEstados.json'

const Join = memo(() => {
  const email = useRef()
  const password = useRef()
  const rePassword = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const phone = useRef()
  const city = useRef()
  const countryCode = useRef()
  const gender = useRef()
  const state = useRef()

  const [creatingUser, setCreatingUser] = useState(false)
  const [ifDepartamentoOrEstado, setIfDepartamentoOrEstado] = useState(
    'Departamento'
  )
  const [actualStateList, setActualStateList] = useState(ColombiaDepartamentos)
  const [actualState, setActualState] = useState(null)
  const [cityList, setCityList] = useState([])

  const [logged] = useAuth('/join')

  const router = useRouter()

  useEffect(() => {
    if (actualState) {
      switch (countryCode.current.value) {
        case '57':
          if (ColombiaCiudades.find((e) => e.name === actualState)) {
            setCityList(
              ColombiaCiudades.find((e) => e.name === actualState).citys
            )
          }
          break
        case '52':
          if (MexicoCiudades.find((e) => e.name === actualState)) {
            setCityList(
              MexicoCiudades.find((e) => e.name === actualState).citys
            )
          }
          break
        default:
          break
      }
    }
  }, [actualState])

  const handleCountryChange = () => {
    state.current.value = ''
    city.current.value = []
    switch (countryCode.current.value) {
      case '52':
        setIfDepartamentoOrEstado('Estado')
        setActualStateList(MexicoEstados)
        break
      case '57':
        setIfDepartamentoOrEstado('Departamento')
        setActualStateList(ColombiaDepartamentos)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rePassword.current.value === password.current.value) {
      try {
        setCreatingUser(true)
        await axios.post(process.env.SERVER + '/user', {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          countryCode: countryCode.current.value,
          phone: phone.current.value,
          state: state.current.value,
          city: city.current.value,
          gender: gender.current.value,
          email: email.current.value,
          password: password.current.value,
          role: 'CHAMPION'
        })
       
        setCreatingUser(false)
        router.push('/login')
      } catch (error) {
        if (error.response.status === 400) {
          setCreatingUser(false)
          alert('El email ya esta registrado')
          return
        }
        setCreatingUser(false)
        console.error(error)
      }
      return
    }
    return alert('Las contraseñas no coinciden')
  }

  return (
    !logged && (
      <>
        <Head title='Chiper Live | Crear Cuenta' />
        <div id='container'>
          <form action='submit' onSubmit={handleSubmit}>
            <h1>Crear Cuenta</h1>
            <div className='input-container'>
              <input
                ref={firstName}
                type='text'
                placeholder='Nombres'
                required
              />
            </div>

            <div className='input-container'>
              <input
                ref={lastName}
                type='text'
                placeholder='Apellidos'
                required
              />
            </div>

            <div className='input-container'>
              <div className='flex'>
                <select
                  ref={countryCode}
                  name='coutry-code'
                  onChange={handleCountryChange}
                >
                  <option value='57'>(+57)</option>
                  <option value='52'>(+52)</option>
                </select>
                <input
                  ref={phone}
                  type='tel'
                  placeholder='Telefono'
                  pattern='[0-9]{8,11}'
                  required
                />
              </div>
            </div>

            <div className='input-container'>
              <input
                ref={state}
                type='search'
                name='findState'
                list='stateList'
                placeholder={ifDepartamentoOrEstado}
                required
                onChange={() => setActualState(state.current.value)}
              />
            </div>
            <datalist id='stateList'>
              {actualStateList.map((state) => (
                <option key={state} value={state} />
              ))}
            </datalist>
            <div className='input-container'>
              <input
                ref={city}
                type='search'
                name='findCity'
                list='cityList'
                placeholder='Ciudad'
                required
                disabled={!actualState && 'disabled'}
              />
            </div>
            <datalist id='cityList'>
              {cityList.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>

            <div className='input-container'>
              <div className='flex'>
                <p>Género: </p>
                <select id='gender' ref={gender}>
                  <option value='F'>Femenino</option>
                  <option value='M'>Masculino</option>
                  <option value='O'>Otro</option>
                  <option value='N'>No especifica</option>
                </select>
              </div>
            </div>

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
            <div className='input-container'>
              <input
                ref={rePassword}
                type='password'
                placeholder='Repetir Contraseña'
                required
              />
            </div>

            <Button type='submit' disabled={creatingUser}>
              Aceptar
            </Button>
            {creatingUser && (
              <p>Creando usuario. Espere un momento por favor.</p>
            )}
            <p>¿Ya tienes una cuenta?</p>
            <Link href='/login'>
              <a>Iniciar Sesión</a>
            </Link>
          </form>
        </div>
        <style jsx>{`
          #container {
            margin-top: 5vh;
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
            margin-bottom: 20px;
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
          select {
            background: white !important;
            height: 40px;
            border-radius: 15px;
          }
          .flex {
            display: flex;
          }
          #gender {
            margin-left: 5px;
            width: 100%;
          }
        `}
        </style>
      </>
    )
  )
})

export default Join
