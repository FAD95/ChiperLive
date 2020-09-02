import React from 'react'

const MenuIcon = ({ setIsOpen }) => {
  function handleClick() {
    setIsOpen(true)
  }
  return (
    <>
      <section onClick={handleClick}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </section>

      <style jsx>
        {`
          @keyframes slideIn {
            from {
              margin-left: 100%;
              width: 300%;
            }
            to {
              margin-left: 0%;
              width: 100%;
            }
          }
          section {
            height: 30px;
            width: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            border-radius: 5px;
          }
          div {
            width: 20px;
            border-bottom: 2px solid black;
          }
        `}
      </style>
    </>
  )
}

export default MenuIcon
