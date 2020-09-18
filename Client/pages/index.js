import { memo, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import Head from '../src/components/head'
import Button from '../src/components/Button'

const Index = memo(() => {
  const auth = useSelector((store) => store.auth)
  const logged = auth.status
  const router = useRouter()
  useEffect(() => {
    if (!logged) {
      router.push('/login')
    }
  })

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
