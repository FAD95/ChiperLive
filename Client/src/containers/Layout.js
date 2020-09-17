import { memo } from 'react'
import { useRouter } from 'next/router'

import Menu from '../components/Menu'

import { useSelector } from 'react-redux'
import setIsLive from '../redux/actions/setIsLive'

const Layout = memo(() => {
  const isLive = useSelector((store) => store.isLive)

  const router = useRouter()
  const finishLive = (e) => {
    e.preventDefault()
    if (isLive) {
      const ans = confirm('Are you sure you want to finish the LIVE?')
      if (ans) {
        router.push('/')
      } else {
        console.log('Nothing happened')
      }
    } else {
      router.push('/')
    }
  }

  return (
    <div className='layout'>
      <header>
        <Menu />

        <a onClick={(e) => finishLive(e)}>
          <img src='/images/chiper-logo.svg' />
          <h3>LIVE</h3>
        </a>

        <div />
        <style jsx>
          {`
            header {
              display: flex;
              align-items: center;
              font-family: Monospace;
              margin: 10px 20px;
              max-width: 100vw;
            }
            a {
              display: flex;
              align-items: center;
              margin-left: 10px;
              text-decoration: none;
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
})

export default Layout
