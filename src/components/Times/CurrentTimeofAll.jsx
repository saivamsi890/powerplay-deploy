import React, { useState, useEffect } from 'react';


// IST TIME
export const ISTClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
  
    useEffect(() => {
      // Update the current time every second
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount
  
    // Format the time as HH:mm:ss
    const formattedTime = currentTime.toLocaleTimeString();
  
    return (
      <div>
        <p>{formattedTime}</p>
      </div>
    );
  };

 

// UTC time
export const UTCClock = () => {
    const [currentUTCTime, setCurrentUTCTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const utcTime = new Date();
            setCurrentUTCTime(utcTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = currentUTCTime.getUTCHours();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    const formattedUTCTime = `${(hours % 12) || 12}:${currentUTCTime.getUTCMinutes()}:${currentUTCTime.getUTCSeconds()} ${amPM}`;
    return (
        <div>
    
            <p>{formattedUTCTime}</p>
        </div>
    );
};

// PACIFIC STANDARD TIME
export const PSTClock = () => {
    const [currentPSTTime, setCurrentPSTTime] = useState(new Date());
  
    useEffect(() => {
        // Update the current PST time every second
        const interval = setInterval(() => {
          const pstTime = new Date();
          // Set the UTC offset to -8 for PST
          pstTime.setUTCMinutes(pstTime.getUTCMinutes() - 480);
          setCurrentPSTTime(pstTime);
        }, 1000);
    
        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
      }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount
    
      // Format the PST time as HH:mm:ss with AM/PM
      const hours = currentPSTTime.getUTCHours();
      const amPM = hours >= 12 ? 'PM' : 'AM';
      const formattedPSTTime = `${(hours % 12) || 12}:${currentPSTTime.getUTCMinutes()}:${currentPSTTime.getUTCSeconds()} ${amPM}`;
  
    return (
      <div>
        <p>{formattedPSTTime}</p>
      </div>
    );
  };

//   EASTER TIME
export const ETClock = () => {
    const [currentETTime, setCurrentETTime] = useState(new Date());
  
    useEffect(() => {
      // Update the current ET time every second
      const interval = setInterval(() => {
        const etTime = new Date();
        // Set the UTC offset to -5 for ET
        etTime.setUTCMinutes(etTime.getUTCMinutes() - 300);
        setCurrentETTime(etTime);
      }, 1000);
  
      // Clean up the interval when the component is unmounted
      return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount
  
    // Format the ET time as HH:mm:ss with AM/PM
    const hours = currentETTime.getUTCHours();
    const amPM = hours >= 12 ? 'PM' : 'AM';
    const formattedETTime = `${(hours % 12) || 12}:${currentETTime.getUTCMinutes()}:${currentETTime.getUTCSeconds()} ${amPM}`;
  
    return (
      <div>
        <p>{formattedETTime}</p>
      </div>
    );
  };



