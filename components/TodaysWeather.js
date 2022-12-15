import Image from 'next/image'
import React from 'react'
import moment from 'moment-timezone'


export default function TodaysWeather({ city, weather, timezone }) {
  return (
    <>
      <div className='bg-blue-600 shadow-lg shadow-gray-500 sticky top-0'>
        <div className="container mx-auto">
          <div className='p-5 w-full flex justify-between items-center'>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <h1 className='text-2xl font-semibold text-white'>{city.name} ({city.country})</h1>
                <div className='flex items-center'>
                  <div className='text-xl font-semibold text-white'>Max: {weather.temp.max.toFixed(0)}&deg;</div>
                  <div className='text-md font-semibold ml-2 text-gray-300'>Min :{weather.temp.min.toFixed(0)}&deg;</div>
                </div>
              </div>
              <div className="flex gap-5 text-white mt-5">
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold">Sunrise</div>
                  <div className='text-md'>{moment.unix(weather.sunrise).tz(timezone).format("LT")}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-semibold">Sunset</div>
                  <div className='text-md'>{moment.unix(weather.sunset).tz(timezone).format("LT")}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-white text-center">
              <div className="text-xl font-semibold">Feels Like</div>
              <div className='text-3xl'>{weather.feels_like.day.toFixed(0)}&deg;C</div>
            </div>
            <div className="flex flex-col text-center">
              <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={100} height={100} />
              <div className="font-bold text-white">{weather.weather[0].description}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
