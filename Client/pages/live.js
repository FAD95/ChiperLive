import Head from '../src/components/head'
import useLiveStream from '../src/hooks/useLiveStream'
import useLocalStream from '../src/hooks/useLocalStream'

export default function FirstPost () {
  
  useLiveStream()
  useLocalStream()
  
  return (
    <>
      <Head title='Chiper Live || En vivo'></Head>
      <video autoPlay></video>
    </>
  )
}
