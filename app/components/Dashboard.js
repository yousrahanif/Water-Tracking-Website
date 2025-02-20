

'use client'
import React, { useEffect, useState } from 'react'
import Calender from "./Calender";
import { useAuth } from '@/context/AuthContext';
import Loading from './Loading';
import Login from './Login';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import WaterQuickEntry from './WaterQuickEntry';
import WaterAwareness from './WaterAwareness';

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const [data, setData] = useState({});
  const [selectedWater, setSelectedWater] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [isPastDay, setIsPastDay] = useState(false);






  const [quickEntryWater, setQuickEntryWater] = useState(0); // Store quick entry data

  const handleQuickEntryUpdate = (glasses) => {
      setQuickEntryWater(glasses);
    };




  const now = new Date();

  const handleDayClick = (dayIndex) => {
    setSelectedDay(dayIndex);
    const clickedDate = new Date(now.getFullYear(), now.getMonth(), dayIndex);
    const isPast = clickedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());

    setIsPastDay(isPast);
    const savedWater = data?.[now.getFullYear()]?.[now.getMonth()]?.[dayIndex];
    setSelectedWater(savedWater || null);
  };

  const handleWaterSelection = (waterAmount, index) => {
    const selectedDate = new Date(now.getFullYear(), now.getMonth(), selectedDay);
    const isPast = selectedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // if (!isPast) {
    //   setSelectedWater(index + 1);
    //   handleSetWater(index + 1, selectedDay);
    // }

    if (!isPast) {
      const totalWater = quickEntryWater + (index + 1); // Calculate TOTAL water *first*

      setSelectedWater(index + 1); // Set the selected water amount
      handleSetWater(totalWater, selectedDay); // Save the TOTAL water

      setQuickEntryWater(0); // *Now* reset quickEntryWater
    }
  };

  function countValues() {
    let total_number_of_days = 0;
    let sum_water = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_water = data[year][month][day];
          total_number_of_days++;
          sum_water += days_water;
        }
      }
    }
    return {
      num_days: total_number_of_days,
    };
  }

  const statues = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetWater(water, selectedDay = now.getDate()) {
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };

      if (!newData[year]) newData[year] = {};
      if (!newData[year][month]) newData[year][month] = {};

      newData[year][month][selectedDay] = water;

      setData(newData);
      setUserDataObj(newData);

      const docRef = doc(db, "users", currentUser.uid);
      await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [selectedDay]: water,
            },
          },
        },
        { merge: true }
      );

    } catch (err) {
      console.error("Failed to set data:", err.message);
    }
  }

  const water = {
    "1-2 glasses": "🥤 Stay Hydrated!",
    "3-5 glasses": "💦 Keep Going!",
    "6-8 glasses": "🚰 Almost There!",
    "9+ glasses": "🏆 Goal Achieved! Hydration Champion!",
  };

  useEffect(() => {
    if (!currentUser) return;

    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const storedData = docSnap.data();
          setData(storedData);
          setUserDataObj(storedData);

          const year = now.getFullYear();
          const month = now.getMonth();
          setSelectedWater(storedData?.[year]?.[month]?.[selectedDay] || null);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }

    fetchData();
  }, [currentUser, selectedDay]);

  useEffect(() => {
    const selectedDate = new Date(now.getFullYear(), now.getMonth(), selectedDay);
    const isPast = selectedDate < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setIsPastDay(isPast);
  }, [selectedDay]);


  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div>
       
<div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 p-6">
  <WaterAwareness></WaterAwareness>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-6 text-white shadow-xl backdrop-blur-md">
        {Object.keys(statues).map((status, index) => (
          <div
            key={index}
            className="p-4 flex flex-col gap-2 bg-white/20 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
          >
            <p className="font-semibold uppercase text-lg">{status.replaceAll("_", " ")}</p>
            <p className="text-2xl font-bold">{statues[status]}</p>
            <div className="w-full h-2 bg-white/30 rounded-full mt-2">
              <div
                className="h-full bg-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${(index + 1) * 30}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <h4 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-indigo-700">
        How much <span className="text-blue-500">Water</span> did you drink today?
      </h4>
     



      <WaterQuickEntry onWaterUpdate={handleQuickEntryUpdate} /> 






      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(water).map((w, index) => (
          <button
            onClick={() => handleWaterSelection(w, index)}
            key={index}
            disabled={isPastDay}
            className={`p-5 rounded-2xl shadow-lg font-semibold text-lg sm:text-xl transition-all duration-300 transform active:scale-95 border-2 ${
              selectedWater === index + 1
                ? "bg-purple-500 text-white border-purple-600"
                : isPastDay
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white border-transparent hover:bg-blue-600 hover:border-purple-400"
            }`}
          >
            <p className="text-2xl">{w}</p>
            <p className="text-sm">{water[w]}</p>
          </button>
        ))}
      </div>

      <Calender
        completeData={data}
        handleSetWater={handleSetWater}
        selectedDay={selectedDay}
        handleDayClick={handleDayClick}
      />
    </div>


    </div>
    
  );
}