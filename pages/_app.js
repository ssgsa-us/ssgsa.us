import { AuthUserProvider } from '../context/AuthUserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
