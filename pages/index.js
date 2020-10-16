import { useEffect, memo } from 'react'

import useAuth from '../src/hooks/useAuth'

import Head from '../src/components/head'
import Button from '../src/components/Button'

import getUser from '../src/axios/getUser'

import { useSelector, useDispatch } from 'react-redux'
import setCurrentUser from '../src/redux/actions/setCurrentUser'

const Index = memo(() => {
  const [logged] = useAuth('/index')

  const token = useSelector((store) => store.auth.token)
  const email = useSelector((store) => store.auth.email)
  const currentUser = useSelector((store) => store.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Object.entries(currentUser).length === 0) {
      const getCurrentUser = async (token) => {
        try {
          const user = await getUser({ token, email })
          console.log(user)
          dispatch(setCurrentUser(user.data.body[0]))
        } catch (error) {
          console.error(error)
        }
      }
      getCurrentUser(token)
    }
  }, [])

  return (
    logged && (
      <>
        <Head title='Chiper Live' />
        <div className='container'>
          <h1>Bienvenido a Chiper Live</h1>
          <Button width='200px' height='80px' link='/live'>
            <div>Iniciar transmisión en vivo</div>
          </Button>
        </div>
        <style jsx>
          {`
            .container {
              text-align: center;
              max-width: 200px;
              margin: 0 auto;
            }
            h1 {
              margin: 50px 0;
            }
          `}
        </style>
      </>
    )
  )
})
export default Index
