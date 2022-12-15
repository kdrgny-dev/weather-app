import React from 'react'
import Head from 'next/head'
import Search from '../components/Search'
import ChangeTheme from '../components/ChangeTheme'

export default function Home() {

  return (
    <div className="container mx-auto">
      <Head>
        <title>NextJS Weather App - kdrgny-dev</title>
        <meta name="description" content="NextJS Weather App" />
      </Head>

      <ChangeTheme />

      <div className="flex flex-col items-center justify-center min-h-screen gap-20">

        <div className="flex items-center text-3xl font-bold">
          Basic Weather App
        </div>

        <Search placeholder={'Search City -> e.g : İstanbul'} />
      </div>

    </div>
  )
}
