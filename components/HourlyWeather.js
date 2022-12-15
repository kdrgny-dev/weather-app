import React from 'react'
import moment from 'moment-timezone'
import Image from 'next/image'

export default function HourlyWeather({ hourlyWeather, timezone }) {
  return (
    <div className="container mx-auto">
      <div className='text-gray-700 text-2xl pb-3 dark:text-gray-100'><span className='font-bold'>Hourly</span> Weather</div>
      <div className='flex gap-3 overflow-auto'>
        {hourlyWeather.map((hour, index) => (
          <div key={index} className='bg-blue-400 rounded-md p-5 lg:w-1/4 w-full flex flex-col gap-4 text-center items-center'>
            <div className="text-xl font-semibold text-white">
              {index === 0 ? 'Now' : moment.unix(hour.dt).tz(timezone).format("LT")}
            </div>
            <Image src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt={hour.weather[0].description} width={100} height={100} />
            <div className="text-2xl font-semibold text-white">{hour.temp.toFixed(0)}&deg;C</div>
          </div>
        ))}
      </div>
    </div>
  )
}
