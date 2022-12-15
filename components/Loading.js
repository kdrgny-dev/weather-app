import React from 'react'
import Lottie from 'react-lottie-player'
import animationData from '../public/32532-day-night.json'

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-black bg-opacity-70 absolute w-full top-0 left-0'>
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  )
}
