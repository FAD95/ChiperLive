const VideoImg = ({ image }) => {
  return (
    <>
      <div className='container'>
        <div className='image-wrapper'>
          <img src={image} alt='' />
        </div>
        <div className='image-wrapper shadow' />
        <div className='live-icon'>
          <p>LIVE</p>
        </div>
      </div>

      <style jsx>{`
              div{
                position: relative;
                display: flex;
              }
              .container{
                margin-bottom: 8px;
              }
              .image-wrapper{
                border-radius: 10px;
                display: block;
                height: 0;
                overflow: hidden;
                padding: 56.25% 0 0 0;
                position: relative;
                width: 100%;                
                z-index: 1;
              }
              img {
                  box-shadow: 0 10px 14px rgba(0, 0, 0, 0.2);
                  height: 100%;
                  object-fit: cover;
                  position: absolute;
                  top: 0;
                  width: 100%;
                  z-index: 0;
                }
                .shadow{
                  background-color: black;
                  position: absolute;
                  top 0;
                  opacity: 0.1;
                }
                .live-icon{
                  position: absolute;
                  z-index: 2;
                  background-color: red;
                  border-radius: 3px;
                  padding: 1px 4px;
                  margin: 5px 5px;
                }
                p{
                  color: white;
                  font-weight: 600;
                }
            `}
      </style>
    </>
  )
}

export default VideoImg
