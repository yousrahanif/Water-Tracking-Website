import React from 'react'
import Button from './Button'
import Calender from './Calender'
import Link from 'next/link'
import CallToAction from './CallToAction'

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>

<h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-shadow-lg">
  AquaTrack: Track Your Daily Water Intake
</h1>
<p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px] text-gray-700">
  {/* Current color - a dark gray */}
  Effortlessly track your daily water consumption with AquaTrack and stay hydrated throughout the day.
</p>

 <CallToAction></CallToAction>

    {/* <Calender demo></Calender> */}
    
    
    </div>
  )
}
