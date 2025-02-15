import React from 'react'
import Button from './Button'
import Calender from './Calender'
import Link from 'next/link'
import CallToAction from './CallToAction'

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>

<h1 className='text-5xl sm:text-6xl md:text-7xl'>
    <span className='text-indigo-700'>Water </span> helps you track <span className='text-indigo-700'>Daily</span> water track
</h1>
<p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto mx-w-[600px]'>Create your your water track and see how much water you consive every day of every year</p>
  <CallToAction></CallToAction>

    {/* <Calender demo></Calender> */}
    
    
    </div>
  )
}
