const Button = ({ width, height, children }) => {
  return (
    <>
      <button>{children}</button>
      <style jsx>{`
            button {
                background-color: #13ce66;
                color: white;
                width: ${width};
                height: ${height};
                border-radius: 10px;
                border: none;
                font-weight: bold;
                font-size:1.2em;
            }
        `}
      </style>
    </>
  )
}

export default Button
