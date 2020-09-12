import Link from 'next/link'

const ButtonBottom = ({ bgcolor, link, onClick, children }) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <button onClick={onClick}>{children}</button>
        </Link>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
      <style jsx>
        {`
          button {
            position: absolute;
            background-color: ${bgcolor};
            color: white;
            border-radius: 10px 10px 0 0;
            border: none;
            font-weight: bold;
            font-size: 1em;
            text-decoration: none;
            right: 0;
            left: 0;
            bottom: 0;
            height: 50px;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

export default ButtonBottom
