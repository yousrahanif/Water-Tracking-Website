'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import Swal from 'sweetalert2';
export default function WaterQuickEntry({ onWaterUpdate }) {
  const { currentUser } = useAuth();
  const [glasses, setGlasses] = useState(0);
  const today = new Date().toLocaleDateString();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const savedGlasses = userData?.[today]?.quickEntry;
        setGlasses(savedGlasses ? parseInt(savedGlasses, 10) : 0);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error getting quick entry data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, today]);

  const handleIncrement = () => {
    setGlasses(glasses + 1);
  };

  const handleDecrement = () => {
    if (glasses > 0) {
      setGlasses(glasses - 1);
    }
  };

  const handleSave = async () => {  // Make handleSave async
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      await setDoc(userDocRef, { [today]: { quickEntry: glasses } }, { merge: true });
      onWaterUpdate(glasses); // Update the parent component
    } catch (error) {
      console.error("Error saving quick entry data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const showQuickEntryInfo = () => {
    Swal.fire({
      title: 'Quick Water Entry',
      text: 'Use this section to quickly log your water intake throughout the day.  Each time you drink water, click the "+" button to add a glass.  This helps you keep track of your total water intake without having to enter it all at once. At the end of the day, or when you are done, click the "Save" button to record your total for today.',
      icon: 'info',
    });
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white flex flex-col items-center relative">
      <div className="absolute top-2 right-2 cursor-pointer" onClick={showQuickEntryInfo}>
        <i className="fas fa-info-circle text-gray-500 hover:text-gray-700 fa-2x"></i> 
      </div>
      <h3 className="text-lg font-semibold mb-2 text-center">Quick Water Entry</h3>
      <div className="flex items-center justify-center mb-4">
        <button onClick={handleDecrement} className="p-2 rounded bg-gray-200 mr-2">
          -
        </button>
        <span className="text-2xl font-bold w-12 text-center">{glasses}</span>
        <button onClick={handleIncrement} className="p-2 rounded bg-gray-200 ml-2">
          +
        </button>
      </div>
      <button
        onClick={handleSave}
        className="mt-2 p-3 rounded-lg bg-blue-600 text-white font-semibold w-full sm:w-auto px-6 py-2 transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Save
      </button>
    </div>
  );
}