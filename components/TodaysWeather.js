import Image from 'next/image'
import React from 'react'
import moment from 'moment/moment'


export default function TodaysWeather({ city, weather }) {
  console.log(weather)
  return (
    <>
      <div className='mb-10 bg-blue-400 rounded-md p-5 w-full flex justify-between'>
        <h1 className='text-2xl font-semibold text-white'>{city.name}, {city.country}</h1>
        <div className='flex items-center'>
          <div className='text-2xl font-semibold text-white'>Max: {weather.temp.max.toFixed(0)}&deg;</div>
          <div className='text-xl font-semibold ml-2 text-gray-200'>Min :{weather.temp.min.toFixed(0)}&deg;</div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-40 h-40 relative">
          <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} layout="fill" />
        </div>
        <div className="text-2xl font-bold">{weather.weather[0].description}</div>
        <div className="text-4xl font-bold">{weather.temp.day.toFixed(0)}&deg;</div>
        <div className="flex items-center">
          <div className="text-xl font-semibold">Feels like: {weather.feels_like.day.toFixed(0)}&deg;</div>
          <div className="text-xl font-semibold ml-2">Humidity: {weather.humidity}</div>
          <div className="text-xl font-semibold ml-2">Sunrise: {moment.unix(weather.sunrise).format("LT")}</div>
          <div className="text-xl font-semibold ml-2">Sunset: {moment.unix(weather.sunset).format("LT")}</div>
        </div>

      </div>
    </>
  )
}
