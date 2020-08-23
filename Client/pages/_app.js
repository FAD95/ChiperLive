import '../src/styles/GlobalStyles.css'
import Layout from '../src/containers/Layout'

export default function App ({ Component, pageProps }) {
  return (
    <>
      <Layout />
      <Component {...pageProps} />
    </>
  )
}
