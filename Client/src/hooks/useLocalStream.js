import {useEffect} from 'react'

const useLocalStream = () =>{
    useEffect(() => {
        let localStream
        
    
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            localStream = stream
            var video = document.querySelector('video');
            video.srcObject = stream;
          })
    
          return () =>{
            localStream.getTracks().forEach((track)=>{
              track.stop()
            })
          }
      }, [])
}

export default useLocalStream