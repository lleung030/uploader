import React from 'react'
import {useState} from 'react';

function Publish() {
    const [pillStatuses, setPillStatuses] = useState([]);
  const [isPillVisible, setIsPillVisible] = useState(false); // Track pill visibility
  
 
    const handlePublishAll = async () => {
      // Publish logic here
      setIsPillVisible(true); // Set pill visibility to true after publishing
      
    };
  return (
    <>
    <div className="flex">
    <button
        className="bg-blue-300 text-white px-4 py-2 rounded"
        onClick={handlePublishAll}
      >
        Publish Pill Status
      </button>
    <div
        className={`pill ${isPillVisible ? 'visible' : 'hidden'}`}
      >
        <p className='inline-block bg-green-600 text-white rounded-full px-4 py-2'>Status: PUBLISHED</p>
      </div>
   
      </div>
      </>
  )
}

export default Publish


