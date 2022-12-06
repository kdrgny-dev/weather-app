import Head from 'next/head'
import Search from '../components/Search'

export default function Home() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>NextJS Weather App - devPanda</title>
        <meta name="description" content="NextJS Weather App" />
      </Head>

      <div className="home">
        <Search />
      </div>

    </div>
  )
}
