import Link from 'next/link'

const Button = ({ width, height, link, children }) => {
  return (
    <>
      <Link href={link}>
        <button>{children}</button>
      </Link>
      <style jsx>{`
            button {
                background-color: #13ce66;
                color: white;
                width: ${width};
                height: ${height};
                border-radius: 10px;
                border: none;
                font-weight: bold;
                font-size:1em;
                padding: 10px 20px;
                text-decoration: none;
            }
        `}
      </style>
    </>
  )
}

export default Button
