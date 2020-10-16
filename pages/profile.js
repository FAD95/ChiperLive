import useAuth from '../src/hooks/useAuth'
import Head from '../src/components/head'
import { useSelector } from 'react-redux'

export default function FirstPost() {
  const [logged] = useAuth('/profile')
  const user = useSelector((store) => store.currentUser)
  console.log(user.firstName)
  return (
    logged && (
      <>
        <div>
          <Head title='Chiper Live | Perfil' />
          <div className='container flex'>
            <h1>Bienvenido</h1>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <div className='flex'>
            <h4>e-mail:</h4>
            <p>{user.email}</p>
          </div>
          <div className='flex'>
            <h4>Pais:</h4>
            <p>{user.countryCode === 57 ? 'Colombia' : 'Mexico'}</p>
          </div>
          <div className='flex'>
            <h4>{user.countryCode === 57 ? 'Departamento' : 'Estado'}</h4>
            <p>{user.state}</p>
          </div>
          <div className='flex'>
            <h4>Ciudad:</h4>
            <p>{user.city}</p>
          </div>
          <div className='flex'>
            <h4>Telefono:</h4>
            <p>{user.phone}</p>
          </div>
          <div className='flex'>
            <h4>Género:</h4>
            <p>{user.gender}</p>
          </div>
        </div>
        <style jsx>
          {`
            .flex {
              display: flex;
              align-items: center;
            }
            .container {
              justify-content: center;
              flex-direction: column;
            }
            h1 {
              margin-top: 10px;
            }
            h3 {
              margin: 20px auto;
            }
            h4 {
              margin: 10px 10px;
            }
          `}
        </style>
      </>
    )
  )
}
