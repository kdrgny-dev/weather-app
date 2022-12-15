import React from 'react'
import Head from 'next/head'
import Search from '../components/Search'
import ChangeTheme from '../components/ChangeTheme'
import Router from 'next/router'

export default function Home() {

  const [pageTitle, setPageTitle] = React.useState(true)

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => setPageTitle(false))

    return () => {
      Router.events.off('routeChangeStart', () => setPageTitle(false))
    }
  }, [])

  return (
    <div className="container mx-auto">
      <Head>
        <title>NextJS Weather App - kdrgny-dev</title>
        <meta name="description" content="NextJS Weather App" />
      </Head>

      <ChangeTheme />

      <div className="flex flex-col items-center justify-center min-h-screen gap-20">

        {pageTitle && <div className="flex items-center text-3xl font-bold">
          Basic Weather App with NextJS
        </div>}

        <Search placeholder={'Search City -> e.g : İstanbul'} />
      </div>

    </div>
  )
}
