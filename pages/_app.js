import "../styles/globals.css"
import "../styles/fonts.css"
import GlobalStyle from "../styles/globalStyles";
import { Analytics } from '@vercel/analytics/next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
      <Analytics />
    </>
  )
}

export default MyApp
