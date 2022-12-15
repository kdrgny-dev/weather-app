import React from 'react'
import Image from 'next/image'
import moment from 'moment-timezone'


export default function WeeklyWeather({ WeeklyWeather, timezone }) {
  return (
    <div className="container mx-auto">
      <div className='text-gray-700 text-2xl pb-3 dark:text-gray-100'><span className='font-bold'>Weekly</span> Weather</div>
      <div className="flex-col flex gap-3">
        {WeeklyWeather.map((day, index) => (
          <div key={index} className='bg-purple-600 rounded-md p-5 items-center flex w-full justify-between '>
            <div className="flex flex-col gap-2">
              <div className='text-4xl font-semibold text-white'>{moment.unix(day.dt).tz(timezone).format("dddd")}</div>
              <div className="flex gap-2 items-center">
                <div className='text-xl font-semibold text-white'>Max: {day.temp.max.toFixed(0)}&deg;C</div>
                <div className='text-md font-semibold ml-2 text-gray-200'>Min: {day.temp.min.toFixed(0)}&deg;C</div>
              </div>
            </div>
            <div className="flex-col gap-2 items-center text-white">
              <div className='font-semibold'>Sunrise</div>
              <div>
                {moment.unix(day.sunrise).tz(timezone).format("LT")}
              </div>
            </div>
            <div className="flex-col gap-2 items-center text-white">
              <div className='font-semibold'>Sunset</div>
              <div>
                {moment.unix(day.sunset).tz(timezone).format("LT")}
              </div>
            </div>
            <div className="flex flex-col text-center">
              <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} width={100} height={100} />
              <div className="text-sm font-semibold -mt-5 text-white">{day.weather[0].description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
