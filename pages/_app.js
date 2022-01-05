import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return (
    <div>
      <Head>
                <title>Logistics DBMS</title>
                <meta name="description" content="Created by Utkarsh Singh" />
                <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
