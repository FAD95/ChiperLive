import { memo } from 'react'

import Menu from '../components/Menu'

const Layout = memo(() => {
  const loggedIn = true
  return (
    <div className='layout'>
      <header>
        {
          loggedIn && <Menu />
        }
        <div>
          <img src='/images/chiper-logo.svg' />
          <h3>LIVE</h3>
        </div>
        <style jsx>{`
          header {
            display: flex;
            align-items: center;
            font-family: Monospace;
            margin: 10px 20px;
            max-width: 100vw;
          }
          div{
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
          h3 {
            color: red;
            margin-left: 5px;
            font-size: 1.5em;
          }
          img {
            width: 80px;
          }
        `}
        </style>
      </header>
    </div>
  )
}
)

export default Layout
