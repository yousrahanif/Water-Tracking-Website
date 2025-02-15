
// 'use client'
// import { gradients, baseRating } from '@/utils'

// import React, {useState} from 'react'



// const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
// const monthsArr = Object.keys(months)
// const now = new Date()
// const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


// export default function Calender(props) {
//   const { demo, completeData, handleSetWater }=props
//   const now = new Date()
//   const currMonth = now.getMonth()
//   const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currMonth])
//   const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  
  
//   const [selectedDay, setSelectedDay] = useState(now.getDate());  // Store the selected day
//   const [selectedWater, setSelectedWater] = useState(null);  // Store the water intake for the selected day
  
//   // Update the state when a day is clicked
//   // const handleDayClick = (dayIndex) => {
//   //   setSelectedDay(dayIndex);
//   //   setSelectedWater(data?.[selectedYear]?.[numericMonth]?.[dayIndex] || null);  // Retrieve saved water intake for that day
//   // };
  
//   const handleDayClick = (dayIndex) => {
//     setSelectedDay(dayIndex); // Update the selected day
//     const savedWater = data?.[selectedYear]?.[numericMonth]?.[dayIndex] || null;
//     setSelectedWater(savedWater);  // Retrieve saved water intake for that day
//   };
  
  




//   const numericMonth = monthsArr.indexOf(selectedMonth)
//   const data = completeData?.[selectedYear]?.[numericMonth] || {}
  
  
  
//   function handleIncrementMonth(val) {
//     // value +1 -1
//     // if we hit the bounds of the months, then we can just adjust the year that is displayed instead
//     if (numericMonth + val < 0) {
//         // set month value = 11 and decrement the year
//         setSelectedYear(curr => curr - 1)
//         setSelectMonth(monthsArr[monthsArr.length - 1])
//     } else if (numericMonth + val > 11) {
//         // set month val = 0 and increment the year
//         setSelectedYear(curr => curr + 1)
//         setSelectMonth(monthsArr[0])
//     } else {
//         setSelectMonth(monthsArr[numericMonth + val])
//     }
// }

// const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)
// const firstDayOfMonth = monthNow.getDay()
// const daysInMonth = new Date(selectedYear, monthsArr.indexOf(selectedMonth) + 1, 0).getDate();

// const daysToDisplay = firstDayOfMonth + daysInMonth

// const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

//   return (
//     <div className='flex flex-col gap-2'>
//         <div className='grid grid-cols-5 gap-4'>
//                 <button onClick={() => {
//                     handleIncrementMonth(-1)
//                 }} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
//                 <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient '}>{selectedMonth}, {selectedYear}</p>
//                 <button onClick={() => {
//                     handleIncrementMonth(+1)
//                 }} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
//             </div>
//     <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>

// {[...Array(numRows).keys()].map((row, rowIndex) => {
//     return (
//       <div key={rowIndex} className='grid grid-cols-7 gap-1'>
        
//         {dayList.map((dayOfWeek, dayOfWeekIndex)=>{
//                      let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)
          
//                      let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true
//                      let isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()] && selectedYear === now.getFullYear();

//                      if (!dayDisplay) {
//                       return (
//                           <div className='bg-white' key={dayOfWeekIndex} />
//                       )
//                   }
             
//                   // let color = demo ?
//                   // gradients.indigo[baseRating[dayIndex]] :
//                   // dayIndex in data ?
//                   //     gradients.indigo[data[dayIndex]] :
//                   //     'white'

//                   let savedWater = data?.[selectedYear]?.[numericMonth]?.[dayIndex]; // Retrieve saved data
// let color = demo
//   ? gradients.indigo[baseRating[dayIndex]]
//   : savedWater
//   ? gradients.indigo[savedWater]
//   : "white";


//                       let isFutureDate =
//   selectedYear > now.getFullYear() ||
//   (selectedYear === now.getFullYear() && numericMonth > now.getMonth()) ||
//   (selectedYear === now.getFullYear() && numericMonth === now.getMonth() && dayIndex > now.getDate());




//                      return (
//                     //   <div
//                     //   style={{ background: isToday ? 'lightblue' : isFutureDate ? 'lightgray' : color }}
//                     //   className={
//                     //     'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
//                     //     (isToday ? ' border-indigo-400' : ' border-indigo-100') +
//                     //     (isFutureDate ? ' text-gray-400 cursor-not-allowed' : color === 'white' ? ' text-indigo-400' : ' text-white')
//                     //   }
//                     //   key={dayOfWeekIndex}
//                     //   onClick={() => {
//                     //     if (!isFutureDate) {
//                     //       handleSetWater(dayIndex);
//                     //     }
//                     //   }}
//                     // >
//                     //   <p>{dayIndex}</p>
//                     // </div>

//                     <div
//   style={{ background: isToday ? 'lightblue' : isFutureDate ? 'lightgray' : color }}
//   className={
//     'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
//     (isToday ? ' border-indigo-400' : ' border-indigo-100') +
//     (isFutureDate ? ' text-gray-400 cursor-not-allowed' : color === 'white' ? ' text-indigo-400' : ' text-white') +
//     (selectedDay === dayIndex ? ' border-2 border-yellow-500' : '')  // Highlight the selected day
//   }
//   key={dayOfWeekIndex}
//   onClick={() => {
//     if (!isFutureDate) {
//       handleDayClick(dayIndex);
//     }
//   }}
// >
//   <p>{dayIndex}</p>
// </div>
                  
//           )
//         })}
//          </div>
//     )
//   })
// }
//     </div>
//     </div>
//   )
// }


'use client'
import { gradients, baseRating } from '@/utils'
import React, { useState } from 'react'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const now = new Date()
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Calender(props) {

  const water = {
    "1-2 glasses": "🥤 Stay Hydrated!",
    "3-5 glasses": "💦 Keep Going!",
    "6-8 glasses": "🚰 Almost There!",
    "9+ glasses": "🏆 Goal Achieved! Hydration Champion!",
  };
  const { demo, completeData, handleSetWater } = props
  const currMonth = now.getMonth()
  const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currMonth])
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedWater, setSelectedWater] = useState(null);

 

  // const handleDayClick = (dayIndex) => {
  //   setSelectedDay(dayIndex);
  //   const savedWater = completeData?.[selectedYear]?.[numericMonth]?.[dayIndex] || null;
  //   setSelectedWater(savedWater);
  // };

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
    const savedWaterIndex = completeData?.[selectedYear]?.[numericMonth]?.[dayIndex] || null;
    
    if (savedWaterIndex) {
      // Map stored index to the actual water category
      const waterKeys = Object.keys(water);
      const waterValue = waterKeys[savedWaterIndex - 1] || "No data";
      setSelectedWater(waterValue);
    } else {
      setSelectedWater(null);
    }
  };
  
  const numericMonth = monthsArr.indexOf(selectedMonth)
  const data = completeData?.[selectedYear]?.[numericMonth] || {}

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSelectedYear(curr => curr - 1)
      setSelectMonth(monthsArr[monthsArr.length - 1])
    } else if (numericMonth + val > 11) {
      setSelectedYear(curr => curr + 1)
      setSelectMonth(monthsArr[0])
    } else {
      setSelectMonth(monthsArr[numericMonth + val])
    }
  }

  const monthNow = new Date(selectedYear, numericMonth, 1)
  const firstDayOfMonth = monthNow.getDay()
  const daysInMonth = new Date(selectedYear, numericMonth + 1, 0).getDate();
  const daysToDisplay = firstDayOfMonth + daysInMonth
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0)

  return (
    <div className='flex flex-col gap-2'>
      <div className='grid grid-cols-5 gap-4'>
        <button onClick={() => handleIncrementMonth(-1)} className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient '}>{selectedMonth}, {selectedYear}</p>
        <button onClick={() => handleIncrementMonth(+1)} className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'>
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {dayList.map((d, index) => (
          <p key={index} className='text-center font-semibold text-md'>{d.slice(0, 3)}</p>
        ))}
      </div>

      {/* <div className={`grid grid-cols-7 gap-2`}>
        {Array.from(Array(numRows).keys()).map(rowIndex => {
          return [...Array(7).keys()].map(colIndex => {
            const dayIndex = rowIndex * 7 + colIndex - firstDayOfMonth + 1
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
              const isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()] && selectedYear === now.getFullYear()
              const isFutureDate = new Date(selectedYear, numericMonth, dayIndex) > now
              const isSelected = dayIndex === selectedDay

              return (
                <button
                  key={dayIndex}
                  onClick={() => handleDayClick(dayIndex)}
                  className={`p-4 ${isToday ? 'bg-blue-200' : isFutureDate ? 'bg-gray-200' : 'bg-white'} rounded-lg cursor-pointer ${isSelected ? 'border-2 border-blue-600' : ''}`}
                >
                  {dayIndex}
                </button>
              );
            }
          })
        })}
      </div> */}





{/* <div className={`grid grid-cols-7 gap-2`}>
  {Array.from(Array(numRows).keys()).map(rowIndex => {
    return [...Array(7).keys()].map(colIndex => {
      const dayIndex = rowIndex * 7 + colIndex - firstDayOfMonth + 1;
      if (dayIndex > 0 && dayIndex <= daysInMonth) {
        const isSelected = dayIndex === selectedDay;
        const savedWaterIndex = data[dayIndex];

        // Map the stored index to the actual water category
        const waterKeys = Object.keys(water);
        const savedWaterLabel = savedWaterIndex ? waterKeys[savedWaterIndex - 1] : null;

        return (
          <button
            key={dayIndex}
            onClick={() => handleDayClick(dayIndex)}
            className={`p-4 ${isSelected ? 'border-2 border-blue-600' : ''} ${
              savedWaterIndex ? 'bg-yellow-200' : 'bg-white'
            } rounded-lg cursor-pointer`}
          >
            <p className="font-bold">{dayIndex}</p>
            {savedWaterLabel && (
              <p className="text-xs text-gray-700">
                {savedWaterLabel} {water[savedWaterLabel]}
              </p>
            )}
          </button>
        );
      }
    });
  })}
</div> */}

<div className={`grid grid-cols-7 gap-2`}>
  {Array.from(Array(numRows).keys()).map(rowIndex => {
    return [...Array(7).keys()].map(colIndex => {
      const dayIndex = rowIndex * 7 + colIndex - firstDayOfMonth + 1;
      if (dayIndex > 0 && dayIndex <= daysInMonth) {
        const isSelected = dayIndex === selectedDay;
        const isToday = dayIndex === now.getDate() && selectedMonth === monthsArr[now.getMonth()] && selectedYear === now.getFullYear();
        const isFutureDate = new Date(selectedYear, numericMonth, dayIndex) > now;
        const isPastDate = new Date(selectedYear, numericMonth, dayIndex) < now;
        const savedWaterIndex = data[dayIndex];

        // Map the stored index to the actual water category
        const waterKeys = Object.keys(water);
        const savedWaterLabel = savedWaterIndex ? waterKeys[savedWaterIndex - 1] : null;

        // Combine the conditions to disable both past and future dates
        const isDisabled = isPastDate || isFutureDate;

        return (
          <button
            key={dayIndex}
            onClick={() => handleDayClick(dayIndex)}
            className={`p-4 ${isSelected ? 'border-2 border-blue-600' : ''} 
              ${isToday ? 'bg-blue-400 text-white font-semibold' : ''} 
              ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} 
              ${savedWaterIndex && !isToday ? 'bg-yellow-200' : 'bg-white'} 
              rounded-lg`}
            disabled={isDisabled}
          >
            <p className="font-bold">{dayIndex}</p>
            {savedWaterLabel && (
              <p className="text-xs text-gray-700">
                {savedWaterLabel} {water[savedWaterLabel]}
              </p>
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
