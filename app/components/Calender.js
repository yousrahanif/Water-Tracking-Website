



'use client'
import { gradients, baseRating } from '@/utils'
import React, { useState } from 'react'

const months = {
  'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
  'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
  'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Calender(props) {
  const water = {
    "1-2 glasses": "🥤 Stay Hydrated!",
    "3-5 glasses": "💦 Keep Going!",
    "6-8 glasses": "🚰 Almost There!",
    "9+ glasses": "🏆 Goal Achieved! Hydration Champion!",
  };
  const { completeData, handleSetWater, selectedDay, handleDayClick } = props;
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectMonth] = useState(monthsArr[currMonth]); // Initialize with current month
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    let newMonthIndex = numericMonth + val;
    let newYear = selectedYear;

    if (newMonthIndex < 0) {
      newYear -= 1;
      newMonthIndex = monthsArr.length - 1;
    } else if (newMonthIndex > 11) {
      newYear += 1;
      newMonthIndex = 0;
    }

    setSelectedYear(newYear);
    setSelectMonth(monthsArr[newMonthIndex]);

    if (newMonthIndex !== now.getMonth() || newYear !== now.getFullYear()) {
      handleDayClick(null); // No day is selected initially for other months
    } else {
      handleDayClick(now.getDate()); // Keep today selected for the current month
    }
  }

  const monthNow = new Date(selectedYear, numericMonth, 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  const handleDayClickInternal = (dayIndex) => {
    handleDayClick(dayIndex);
  };


  

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => handleIncrementMonth(-1)} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        {/* <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient '}>{selectedMonth}, {selectedYear}</p> */}
       
        <p className='text-center col-span-3 text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 transition-all duration-300 hover:scale-105'>
  {selectedMonth}, {selectedYear}
</p>

       
        <button onClick={() => handleIncrementMonth(+1)} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {dayList.map((d, index) => (
          <p key={index} className='text-center font-semibold text-md'>{d.slice(0, 3)}</p>
        ))}
      </div>

      <div className={`grid grid-cols-7 gap-2`}>
        {Array.from(Array(numRows).keys()).map(rowIndex => {
          return [...Array(7).keys()].map(colIndex => {
            const dayIndex = rowIndex * 7 + colIndex - firstDayOfMonth + 1;
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
              const isSelected = dayIndex === selectedDay;
              const isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()] && selectedYear === now.getFullYear();

              const isFutureDate = new Date(selectedYear, numericMonth, dayIndex) > now;
              const isPastDate = new Date(selectedYear, numericMonth, dayIndex) < now;
              const savedWaterIndex = completeData?.[selectedYear]?.[numericMonth]?.[dayIndex];

              const waterKeys = Object.keys(water);
              const savedWaterLabel = savedWaterIndex ? waterKeys[savedWaterIndex - 1] : null;

              return (
                <button
                  key={dayIndex}
                  onClick={() => handleDayClickInternal(dayIndex)}
                  className={`p-4 rounded-lg font-bold flex flex-col items-center justify-center 
                    ${isSelected ? 'border-2 border-blue-600' : ''} 
                    ${isToday ? 'bg-blue-600 text-white font-semibold ring-2 ring-blue-400' : ''} 
                    ${isFutureDate ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
                    ${savedWaterIndex && !isToday ? 'bg-purple-300' : 'bg-white'}
                  `}
                  disabled={isFutureDate}
                >
                  <p>{dayIndex}</p>
                  {savedWaterLabel && (
                    <p className="text-xs">{savedWaterLabel} {water[savedWaterLabel]}</p>
                  )}
                  {!isFutureDate && isPastDate && !savedWaterIndex && (
                    <p className="text-red-500 text-lg font-bold">❌</p>
                  )}
                </button>

              );
            }
          });
        })}
      </div>
    </div>
  )
}