import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import MenuIcon from './MenuIcon'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import setAuth from '../redux/actions/setAuth'

const Menu = () => {
  const isLive = useSelector((store) => store.isLive)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleClick = (e, href) => {
    e.preventDefault()
    if (isLive) {
      setIsOpen(false)
      const ans = confirm('Are you sure you want to finish the LIVE?')
      if (ans) router.push(href)
      console.log('Nothing happened')
    } else {
      setIsOpen(false)
      router.push(href)
    }
  }

  return (
    <>
      <MenuIcon setIsOpen={setIsOpen} />
      {isOpen && (
        <>
          <section>
            <div className='closeMenu' onClick={(e) => handleClick(e, '')}>
              <MdClose />
            </div>
            <ul>
              <li>
                <a onClick={(e) => handleClick(e, '/')}>Inicio</a>
              </li>
              <li>
                <a onClick={(e) => handleClick(e, '/profile')}>Perfil</a>
              </li>
              <li>
                <a onClick={(e) => handleClick(e, '/settings')}>
                  Configuración
                </a>
              </li>
              <li
                onClick={() =>
                  dispatch(
                    setAuth({
                      status: false,
                      token: '',
                    })
                  )
                }
              >
                Cerrar sesión
              </li>
            </ul>
          </section>

          <style jsx>
            {`
              @keyframes animation {
                from {
                  left: -200px;
                }
                to {
                  left: 0;
                }
              }
              section {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                z-index: 9999;
                width: 200px;
                background-color: red;
                animation: animation 1s ease;
              }
              .closeMenu {
                border: solid 1px white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                color: white;
                right: 10px;
                top: 10px;
              }
              ul {
                margin: 10px 0;
                list-style: none;
                padding: 40px 20px 0;
              }
              li {
                color: white;
                font-size: 1.5;
                font-weight: 600;
                margin-bottom: 20px;
              }
              a {
                color: white;
                text-decoration: none;
              }
            `}
          </style>
        </>
      )}
    </>
  )
}

export default Menu
