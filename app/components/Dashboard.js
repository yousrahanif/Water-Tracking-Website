
// 'use client'
// import React, { useEffect, useState } from 'react'
// import Calender from "./Calender";
// import { useAuth } from '@/context/AuthContext';
// import Loading from './Loading';
// import Login from './Login';
// import { doc, setDoc } from 'firebase/firestore';
// import { db } from '@/firebase';





// export default function Dashboard() {
//   const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
//   const [data, setData] = useState({})
//   const [selectedWater, setSelectedWater] = useState(null);

//   const [selectedDay, setSelectedDay] = useState(new Date().getDate());  // Initialize selectedDay



//   const handleWaterSelection = (waterAmount, index, selectedDay) => {
//     setSelectedWater(index + 1);  // Store the selected button index
//     handleSetWater(index + 1, selectedDay);  // Call handleSetWater with the selected day
//   };
  



// // const handleWaterSelection = (waterAmount, index) => {
// //   setSelectedWater(index + 1); // Store the selected button index
// //   handleSetWater(index + 1); // Call your existing function
// // };
//   const now = new Date()

//   function countValues() {
//     let total_number_of_days = 0
//     let sum_water = 0
//     for (let year in data) {
//       for (let month in data[year]) {
//         for (let day in data[year][month]) {
//           let days_water = data[year][month][day]
//           total_number_of_days++
//           sum_water += days_water 
//         }
//       }
//     }
//     return { 
//       num_days: total_number_of_days, 
//       // average_water: total_number_of_days > 0 ? sum_water / total_number_of_days : 0 
//     }  
  
//   }
//   const statues = {
//     ...countValues(),
//     time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
//   };


//   // async function handleSetWater(water) {
//   //   const day = now.getDate()
//   //   const month = now.getMonth()
//   //   const year = now.getFullYear()

//   //   try {
//   //     const newData = { ...userDataObj }
//   //     if (!newData?.[year]) {
//   //       newData[year] = {}
//   //     }
//   //     if (!newData?.[year]?.[month]) {
//   //       newData[year][month] = {}
//   //     }

//   //     newData[year][month][day] = water
//   //     // update the current state
//   //     setData(newData)
//   //     // update the global state
//   //     setUserDataObj(newData)
//   //     // update firebase
//   //     const docRef = doc(db, 'users', currentUser.uid)
//   //     const res = await setDoc(docRef, {
//   //       [year]: {
//   //         [month]: {
//   //           [day]: water
//   //         }
//   //       }
//   //     }, { merge: true })
//   //   } catch (err) {
//   //     console.log('Failed to set data: ', err.message)
//   //   }
//   // }

//   async function handleSetWater(water, selectedDay = now.getDate()) {
//     const month = now.getMonth();
//     const year = now.getFullYear();
  
//     try {
//       const newData = { ...userDataObj };
  
//       // Ensure year and month objects exist
//       if (!newData[year]) newData[year] = {};
//       if (!newData[year][month]) newData[year][month] = {};
  
//       // Only update the specific day’s water intake without affecting others
//       const existingData = newData[year][month];
//       existingData[selectedDay] = water;
  
//       // Update the state
//       setData(newData);
//       setUserDataObj(newData);
  
//       // Store data in Firestore with merge option to keep other days intact
//       const docRef = doc(db, "users", currentUser.uid);
//       await setDoc(
//         docRef,
//         {
//           [year]: {
//             [month]: {
//               [selectedDay]: water,
//             },
//           },
//         },
//         { merge: true }
//       );
//     } catch (err) {
//       console.log("Failed to set data: ", err.message);
//     }
//   }
  


  
//   const water = {
//     "1-2 glasses": "🥤 Stay Hydrated!",
//     "3-5 glasses": "💦 Keep Going!",
//     "6-8 glasses": "🚰 Almost There!",
//     "9+ glasses": "🏆 Goal Achieved! Hydration Champion!",
//   };
//   // useEffect(() => {
//   //   if (!currentUser || !userDataObj) {
//   //     return
//   //   }
//   //   setData(userDataObj)
//   // }, [currentUser, userDataObj])


//   useEffect(() => {
//     if (!currentUser || !userDataObj) {
//       return;
//     }
//     setData(userDataObj);
  
//     // Get the saved water intake for the selected day
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth();
    
//     // Retrieve the saved data for the selected day
//     const savedWater = userDataObj?.[year]?.[month]?.[selectedDay];
//     setSelectedWater(savedWater || null);  // Set the saved water intake or null if none
//   }, [currentUser, userDataObj, selectedDay]);
  





//   if (loading) {
//     return <Loading />
//   }

//   if (!currentUser) {
//     return <Login />
//   }

//   return (
//     <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 p-6">
//       {/* Status Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-6 text-white shadow-xl backdrop-blur-md">
//         {Object.keys(statues).map((status, index) => (
//           <div
//             key={index}
//             className="p-4 flex flex-col gap-2 bg-white/20 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
//           >
//             <p className="font-semibold uppercase text-lg">{status.replaceAll("_", " ")}</p>
//             <p className="text-2xl font-bold">{statues[status]}</p>
//             {/* Animated Progress Bar (Just for effect) */}
//             <div className="w-full h-2 bg-white/30 rounded-full mt-2">
//               <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${(index + 1) * 30}%` }}></div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Water Intake Section */}
//       <h4 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-indigo-700">
//         How much <span className="text-blue-500">Water</span> did you drink today?
//       </h4>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {/* {Object.keys(water).map((w, index) => (
      
//           <button
//           onClick={() => handleWaterSelection(w, index)}
//           key={index}
//           className={`p-5 rounded-2xl shadow-lg font-semibold text-lg sm:text-xl transition-all duration-300 transform active:scale-95 border-2 ${
//             selectedWater === index + 1
//               ? "bg-yellow-500 text-white border-yellow-600" // Highlight selected button
//               : "bg-blue-500 text-white border-transparent hover:bg-blue-600 hover:border-yellow-400"
//           }`}
//         >
//           <p className="text-2xl">{w}</p>
//           <p className="text-sm">{water[w]}</p>
//         </button>
//         ))} */}

// {Object.keys(water).map((w, index) => (
//   <button
//     onClick={() => handleWaterSelection(w, index, selectedDay)}  // Pass selectedDay here
//     key={index}
//     className={`p-5 rounded-2xl shadow-lg font-semibold text-lg sm:text-xl transition-all duration-300 transform active:scale-95 border-2 ${
//       selectedWater === index + 1
//       ? "bg-yellow-500 text-white border-yellow-600"  // Highlight selected button
//       : "bg-blue-500 text-white border-transparent hover:bg-blue-600 hover:border-yellow-400"
//     }`}
//   >
//     <p className="text-2xl">{w}</p>
//     <p className="text-sm">{water[w]}</p>
//   </button>
// ))}


//       </div>
//       <Calender completeData={data}  handleSetWater={handleSetWater}  selectedDay={selectedDay} ></Calender>

//     </div>
//   );
// }


'use client'
import React, { useEffect, useState } from 'react'
import Calender from "./Calender";
import { useAuth } from '@/context/AuthContext';
import Loading from './Loading';
import Login from './Login';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth()
  const [data, setData] = useState({})
  const [selectedWater, setSelectedWater] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());  // Initialize selectedDay

  const handleWaterSelection = (waterAmount, index, selectedDay) => {
    setSelectedWater(index + 1);  // Store the selected button index
    handleSetWater(index + 1, selectedDay);  // Call handleSetWater with the selected day
  };

  const now = new Date()

  function countValues() {
    let total_number_of_days = 0
    let sum_water = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_water = data[year][month][day]
          total_number_of_days++
          sum_water += days_water 
        }
      }
    }
    return { 
      num_days: total_number_of_days, 
    }  
  }

  const statues = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  // async function handleSetWater(water, selectedDay = now.getDate()) {
  //   const month = now.getMonth();
  //   const year = now.getFullYear();
  
  //   try {
  //     const newData = { ...userDataObj };
  
  //     // Ensure year and month objects exist
  //     if (!newData[year]) newData[year] = {};
  //     if (!newData[year][month]) newData[year][month] = {};
  
  //     // Only update the specific day’s water intake without affecting others
  //     const existingData = newData[year][month];
  //     existingData[selectedDay] = water;
  
  //     // Update the state
  //     setData(newData);
  //     setUserDataObj(newData);
  
  //     // Store data in Firestore with merge option to keep other days intact
  //     const docRef = doc(db, "users", currentUser.uid);
  //     await setDoc(
  //       docRef,
  //       {
  //         [year]: {
  //           [month]: {
  //             [selectedDay]: water,
  //           },
  //         },
  //       },
  //       { merge: true }
  //     );
  //   } catch (err) {
  //     console.log("Failed to set data: ", err.message);
  //   }
  // }

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
      await setDoc(docRef, newData, { merge: true });
  
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

  // useEffect(() => {
  //   if (!currentUser || !userDataObj) {
  //     return;
  //   }
  //   setData(userDataObj);
  
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth();
    
  //   const savedWater = userDataObj?.[year]?.[month]?.[selectedDay];
  //   setSelectedWater(savedWater || null);
  // }, [currentUser, userDataObj, selectedDay]);

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
  
          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth();
          const savedWater = storedData?.[year]?.[month]?.[selectedDay] || null;
          setSelectedWater(savedWater);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }
  
    fetchData();
  }, [currentUser, selectedDay]);

  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg p-6 text-white shadow-xl backdrop-blur-md">
        {Object.keys(statues).map((status, index) => (
          <div
            key={index}
            className="p-4 flex flex-col gap-2 bg-white/20 rounded-xl shadow-md hover:scale-105 transition-all duration-300"
          >
            <p className="font-semibold uppercase text-lg">{status.replaceAll("_", " ")}</p>
            <p className="text-2xl font-bold">{statues[status]}</p>
            <div className="w-full h-2 bg-white/30 rounded-full mt-2">
              <div className="h-full bg-yellow-400 rounded-full transition-all duration-500" style={{ width: `${(index + 1) * 30}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <h4 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-indigo-700">
        How much <span className="text-blue-500">Water</span> did you drink today?
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(water).map((w, index) => (
          <button
            onClick={() => handleWaterSelection(w, index, selectedDay)}  
            key={index}
            className={`p-5 rounded-2xl shadow-lg font-semibold text-lg sm:text-xl transition-all duration-300 transform active:scale-95 border-2 ${
              selectedWater === index + 1
              ? "bg-yellow-500 text-white border-yellow-600"  
              : "bg-blue-500 text-white border-transparent hover:bg-blue-600 hover:border-yellow-400"
            }`}
          >
            <p className="text-2xl">{w}</p>
            <p className="text-sm">{water[w]}</p>
          </button>
        ))}
      </div>
      <Calender completeData={data} handleSetWater={handleSetWater} selectedDay={selectedDay}></Calender>
    </div>
  );
}
