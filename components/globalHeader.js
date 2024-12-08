import GlobalStyle from "../styles/globalStyles";
import Head from 'next/head';

export default function GlobalHeader() {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Magdalena Navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  )
}
