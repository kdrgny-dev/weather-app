import Head from 'next/head'
import React from 'react'
import TodaysWeather from '../../components/TodaysWeather'
import cities from '../../lib/city.list.json'
import moment from 'moment-timezone'
import HourlyWeather from '../../components/HourlyWeather'
import WeeklyWeather from '../../components/WeeklyWeather'
import Search from '../../components/Search'
import Link from 'next/link'
import { Router } from 'next/router'
import Loading from '../../components/Loading'
import ChangeTheme from '../../components/ChangeTheme'

export async function getServerSideProps(context) {

  const city = getCity(context.params.city)
  const slug = context.params.city

  if (!city) {
    return {
      notFound: true
    }
  }

  const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely
  `)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone)


  return {
    props: {
      city,
      timezone: data.timezone,
      currentWeather: data.current,
      hourlyWeather,
      dailyWeather: data.daily
    }
  }
}

const getCity = param => {
  const cityParam = param.trim()
  const splitCity = cityParam.split('-')
  const id = splitCity[splitCity.length - 1]

  if (!id) return null

  const city = cities.find(city => city.id.toString() == id)

  if (city) {
    return city
  } else {
    return null
  }
}

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf('day').valueOf()
  const endOfDayTimeStamp = Math.floor(endOfDay / 1000)

  const todaysData = hourlyData.filter(data => data.dt < endOfDayTimeStamp)

  return todaysData
}

export default function City({ city, currentWeather, hourlyWeather, dailyWeather, timezone }) {

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    Router.events.on('routeChangeStart', () => setLoading(true))
    Router.events.on('routeChangeComplete', () => setLoading(false))

    return () => {
      Router.events.off('routeChangeStart', () => setLoading(true))
      Router.events.off('routeChangeComplete', () => setLoading(false))
    }
  }, [])

  if (loading) {
    return <Loading />
  }



  return (
    <>
      <ChangeTheme />
      <Head>
        <title>{city.name} - Weather App</title>
      </Head>
      <div className="flex flex-col gap-10 pb-10">
        <div className="container mx-auto pt-3">
          <Link href='/' className='text-blue-600 font-semibold'>
            &#8592; Home
          </Link>
        </div>
        <Search placeholder="Search for another location..." />
        <TodaysWeather city={city} weather={dailyWeather[0]} timezone={timezone} />
        <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
        <WeeklyWeather WeeklyWeather={dailyWeather} timezone={timezone} />
      </div>
    </>
  )
}
