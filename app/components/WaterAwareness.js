// components/WaterAwareness.js
"use client"
import React, { useState, useEffect } from 'react';

const WaterAwareness = () => {
    const waterFacts = [
        "Approximately 2.2 billion people lack access to safe drinking water.",
        "Water scarcity affects more than 40% of the global population.",
        "Over 80% of wastewater worldwide is released back into the environment without treatment.",
        "It is estimated that by 2025, half of the world's population will be living in water-stressed areas.",
        "Access to clean water can save lives and improve health, particularly for children.",
        "Water conservation is crucial for ensuring a sustainable future for all.",
        "The average person in the United States uses about 80-100 gallons of water per day.",
        "Agriculture accounts for about 70% of global freshwater withdrawals.",
        "Contaminated water and poor sanitation are linked to diseases like cholera and typhoid.",
        "Investing in water infrastructure can boost economic growth and reduce poverty.",
      ];

  const [currentFact, setCurrentFact] = useState(waterFacts[0]);

  const displayRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * waterFacts.length);
    setCurrentFact(waterFacts[randomIndex]);
  };

  useEffect(() => {
    const intervalId = setInterval(displayRandomFact, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-11/12 mx-auto p-8 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg mb-6 text-center transition duration-300 hover:scale-105">
      <div className="max-w-md mx-auto"> {/* Center content and limit width */}
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6 drop-shadow-md">
        Important Facts About Global Water Awareness
        </h2>
        <p
          id="random-fact"
          className="text-xl italic text-gray-700 mb-8 animate-pulse" 
        >
          {currentFact}
        </p>
        <button
          onClick={displayRandomFact}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300" // Improved button styling
        >
          Show Another Fact
        </button>
      </div>

     
    </section>
  );
};

export default WaterAwareness;