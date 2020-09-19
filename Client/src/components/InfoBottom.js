const InfoBottom = ({ children }) => (
  <>
    <div>{children}</div>
    <style jsx>{`
      div {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: orange;
        text-align: center;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px 10px 0 0;
        color: white;
        font-weight: bold;
      }
    `}
    </style>
  </>
)

export default InfoBottom
