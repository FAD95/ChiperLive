import React, { memo } from 'react'
import Link from 'next/link'
const  Layout = memo(({children})=>{
  return (
    <div className='layout'>
      <header>
        <img src='/static/chiper-logo.svg' />
        <h3>LIVE</h3>
        { children }
        <style jsx>{`
          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: Monospace;
            margin: 10px 20px;
          }
          h3 {
            color: red;
            margin-left: 10px;
            font-size: 3em;
          }
          img {
            width: 100px;
          }
        `}</style>
      </header>
    </div>
  )
}
)

export default Layout