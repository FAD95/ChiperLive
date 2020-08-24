import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import MenuIcon from './MenuIcon'
import Link from 'next/link'

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuIcon setIsOpen={setIsOpen} />
      {
        isOpen &&
          <>
            <section>
              <div className='closeMenu' onClick={handleClick}>
                <MdClose />
              </div>
              <ul>
                <li><Link href='/'><a onClick={handleClick}>Inicio</a></Link></li>
                <li><Link href='/profile'><a onClick={handleClick}>Perfil</a></Link></li>
                <li><Link href='/settings'><a onClick={handleClick}>Configuración</a></Link></li>
                <li onClick={handleClick}>Cerrar sesión</li>
              </ul>
            </section>

            <style jsx>{` 
                        @keyframes animation{
                            from {
                                left: -200px;
                            }
                            to {
                                left: 0;
                            }
                        }
                        section{
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            z-index: 9999;
                            width: 200px;
                            background-color: red;                        
                            animation: animation 1s ease;
                        }
                        .closeMenu{
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
                        ul{
                            margin: 10px 0;
                            list-style: none;
                            padding: 40px 20px 0;
                        }
                        li{ 
                            color: white;
                            font-size:1.5;
                            font-weight: 600;
                            margin-bottom: 20px;
                        }
                        a{
                            color: white;
                            text-decoration: none;
                        }
                    `}
            </style>
          </>
      }
    </>
  )
}

export default Menu
