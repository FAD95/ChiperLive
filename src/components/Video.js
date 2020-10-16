const Video = ({ videoRef }) => (
  <>
    <video ref={videoRef} muted playsInline />
    <style jsx>
      {`
        video {
          max-width: 100vw;
        }
      `}
    </style>
  </>
)

export default Video
