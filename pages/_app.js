import '../src/styles/GlobalStyles.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Layout from '../src/containers/Layout'
import { Provider } from 'react-redux'
import store from '../src/redux/store'

export default function App ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout />
      <Component {...pageProps} />
    </Provider>
  )
}
