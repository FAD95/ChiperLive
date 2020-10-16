import Link from 'next/link'

const Button = ({ width, height, link, onClick, disabled, children }) => (
  <>
    {link ? (
      <Link href={link}>
        <button onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </Link>
    ) : (
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
    )}
    <style jsx>
      {`
        button {
          background-color: #13ce66;
          color: white;
          width: ${width};
          height: ${height};
          border-radius: 10px;
          border: none;
          font-weight: bold;
          font-size: 1em;
          padding: 10px 20px;
          text-decoration: none;
          margin-top: 20px;
          cursor: pointer;
        }
      `}
    </style>
  </>
)

export default Button
