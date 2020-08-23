import VideoImg from './VideoImg'
import { MdLocationOn } from 'react-icons/md'
import Link from 'next/link'

const videos = [
  {
    id: 1,
    name: 1,
    image: '/images/chiper-logo.svg',
    autor:1
  }, {
    id: 2,
    name: 2,
    image: '/images/chiper-logo.svg',
    autor:2
  },
  {
    id: 3,
    name: 3,
    image: '/images/chiper-logo.svg',
    autor:3
  },
  {
    id: 4,
    name: 4,
    image: '/images/chiper-logo.svg',
    autor:4
  }
]

const LiveStreamsList = () => (
  <section>
    {
      videos.map(video => {
        return (
          <div key={video.id}>
            <Link href='/live'>
              <a>
                <VideoImg image={video.image} id='video-img' />                
              </a>
            </Link>
            <h3>Video {video.name}</h3>
            <Link href="/author">
              <a><p>Autor</p></a>
            </Link>
                
                <p><span><MdLocationOn /></span>Ubicación</p>

          </div>
        )
      })
    }
    <style jsx>{`
        a{
          text-decoration: none;
          color: black;
        }
        h1{
          margin-bottom: 30px;
        }
        div{
          margin-bottom: 20px;          
        }
      `}
    </style>
  </section>
)

export default LiveStreamsList
