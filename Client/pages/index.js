import { memo } from 'react'

import useAuth from '../src/hooks/useAuth'

import Head from '../src/components/head'
import Button from '../src/components/Button'

const Index = memo(() => {
  const [logged] = useAuth('/index')
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
