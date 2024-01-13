import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import "./draggablecard.css"



const DraggableItem = ({ id, pc, index, text, moveItem, date, clock, slidertime, rem }) => {
    // This is for Drag functionality
    const [, drag] = useDrag({
        type: 'DRAGGABLE_ITEM',
        item: { id, index },
    });

    // This is for Drop functionality
    const [, drop] = useDrop({
        accept: 'DRAGGABLE_ITEM',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    // For setting the drop down slection list values
    const [selectedTimeZone, setSelectedTimeZone] = useState('UST');
    const timeZones = [
        { label: 'U.S. Eastern Time', value: 'UST' },
        { label: 'Indian Standard Time', value: 'IST' },
        { label: 'Pacific Standard Time', value: 'PST' },
        { label: 'Eastern Standard Time', value: 'ET' },
    ];

    const handleTimeZoneChange = (event) => {
        setSelectedTimeZone(event.target.value);
    };

    // this is for slider value
    const [selectedTime, setSelectedTime] = useState(0);

    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        // Update the state with the selected date
        setSelectedDate(event.target.value);
    };

    // to show the proper format values
    const formatTime = (value) => {
        const hours = Math.floor(value / 4);
        const minutes = (value % 4) * 15;
        const amPM = hours < 12 ? 'AM' : 'PM';

        const formattedHours = (hours % 12) || 12;
        const formattedMinutes = String(minutes).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${amPM}`;
    };

    // to hanfle the slider values
    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedTime(value);
    };



    // Function to extract the hrs, min ,am or pm and date
    const ExtractHMAPD = (value) => {
        const hours = Math.floor(value / 4);
        const minutes = (value % 4) * 15;
        const amPM = hours < 12 ? 'AM' : 'PM';

        const formattedHours = (hours % 12) || 12;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedDate = selectedDate;

        console.log("from extract" + amPM + formattedHours + formattedMinutes + formattedDate);
        // return  ConvertToUtc(formattedHours, formattedMinutes, amPM, formattedDate);
        const mp = {
            formattedHours: formattedHours,
            formattedMinutes: formattedMinutes,
            formattedDate: formattedDate,
            amPM: amPM,
        }
        return mp;
    };


    const [convetime, setconvetime] = useState('');

    // This function is used to convert th other time zones to particular time zone
    const ConvertFunc = () => {
        const extr = ExtractHMAPD(selectedTime);
        if (pc === 'IST') {
            if (selectedTimeZone == 'UST') {
                const ans = ConvertISTToUtc(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans);
                    return ans;
                }

            }
            else if (selectedTimeZone == 'IST') {
                const ans = convertISTToIST(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'PST') {
                const ans = convertISTToPST(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'ET') {
                const ans = convertISTToET(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans);
                    return ans;
                }
            } else {
                alert('please choose the conversion Type again')
            }
        }
        else if (pc === 'UST') {
            if (selectedTimeZone == 'UST') {
                const ans = convertUSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.ustTime)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.ustTime);
                    return ans;
                }

            }
            else if (selectedTimeZone == 'IST') {
                const ans = convertUSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.istTime)) == true) {
                    console.log(ans.istTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.istTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'PST') {
                const ans = convertUSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.pstTime)) == true) {
                    console.log(ans.pstTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.pstTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'ET') {
                const ans = convertUSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.etTime)) == true) {
                    console.log(ans.etTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.etTime);
                    return ans;
                }
            } else {
                alert('please choose the conversion Type again')
            }
        }
        else if (pc === 'PST') {
            console.log("in pst pls wo");
            if (selectedTimeZone == 'UST') {
                const ans = convertPSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.ustTime)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.ustTime);
                    return ans;
                }

            }
            else if (selectedTimeZone == 'IST') {
                const ans = convertPSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.istTime)) == true) {
                    console.log(ans.istTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.istTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'PST') {
                const ans = convertPSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.pstTime)) == true) {
                    console.log(ans.pstTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.pstTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'ET') {
                const ans = convertPSTToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.etTime)) == true) {
                    console.log(ans.etTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.etTime);
                    return ans;
                }
            } else {
                alert('please choose the conversion Type again')
            }
        }
        else {
            if (selectedTimeZone == 'UST') {
                const ans = convertETToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.ustTime)) == true) {
                    console.log(ans);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.ustTime);
                    return ans;
                }

            }
            else if (selectedTimeZone == 'IST') {
                const ans = convertETToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.istTime)) == true) {
                    console.log(ans.istTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.istTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'PST') {
                const ans = convertETToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.pstTime)) == true) {
                    console.log(ans.pstTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.pstTime);
                    return ans;
                }
            }
            else if (selectedTimeZone == 'ET') {
                const ans = convertETToTimeZones(extr.formattedHours, extr.formattedMinutes, extr.amPM, extr.formattedDate);
                if (Number.isNaN(parseFloat(ans.etTime)) == true) {
                    console.log(ans.etTime);
                    alert('please select the date')
                }
                else {
                    setconvetime(ans.etTime);
                    return ans;
                }
            } else {
                alert('please choose the conversion Type again')
            }
        }

    }


    // function to convert IST TO OTHERS 
    const ConvertISTToUtc = (currentHour, currentMinute, amPm, currentDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currentHour, 10);
        const minutes = parseInt(currentMinute, 10);

        console.log(hours, minutes);

        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Create a new Date object with the provided date and time
        const localDate = new Date(`${currentDate} ${hours}:${minutes}`);

        // Get the UTC values
        const utcYear = localDate.getUTCFullYear();
        const utcMonth = localDate.getUTCMonth() + 1; // Months are zero-based
        const utcDay = localDate.getUTCDate();
        const utcHours = localDate.getUTCHours();
        const utcMinutes = localDate.getUTCMinutes();

        console.log(utcHours, utcMinutes);
        const amOrPm = utcHours < 12 ? 'AM' : 'PM';
        const formattedHours = (utcHours % 12) || 12;

        console.log('UTC TIME');
        const res = `${utcYear}-${utcMonth.toString().padStart(2, '0')}-${utcDay.toString().padStart(2, '0')} ${formattedHours.toString().padStart(2, '0')}:${utcMinutes.toString().padStart(2, '0')} ${amOrPm}`;

        console.log(res);

        return res;

    };

    const convertISTToIST = (currentHour, currentMinute, amPm, currentDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currentHour, 10);
        const minutes = parseInt(currentMinute, 10);

        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Create a new Date object with the provided date and time
        let localDate = new Date(`${currentDate} ${hours}:${minutes}`);

        // Check if the passed time is already in IST (to avoid double adjustment)
        const isIST = localDate.getTimezoneOffset() === -330; // IST is UTC+5:30

        // If not already in IST, adjust to IST
        if (!isIST) {
            // Set the UTC offset for IST (Indian Standard Time is UTC+5:30)
            const istOffset = 330; // 5 hours and 30 minutes in minutes
            localDate = new Date(localDate.getTime() + istOffset * 60000);
        }

        // Get the IST values
        const istYear = localDate.getFullYear();
        const istMonth = localDate.getMonth() + 1; // Months are zero-based
        const istDay = localDate.getDate();
        const istHours = localDate.getHours();
        const istMinutes = localDate.getMinutes();
        const istAmOrPm = istHours < 12 ? 'AM' : 'PM';
        const formattedISTHours = (istHours % 12) || 12;

        const res = `${istYear}-${istMonth.toString().padStart(2, '0')}-${istDay.toString().padStart(2, '0')} ${formattedISTHours.toString().padStart(2, '0')}:${istMinutes.toString().padStart(2, '0')} ${istAmOrPm}`;
        console.log("IST TIME:" + res);
        return res;
    };

    const convertISTToPST = (currentHour, currentMinute, amPm, currentDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currentHour, 10);
        const minutes = parseInt(currentMinute, 10);

        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Create a new Date object with the provided date and time using ISO 8601 format
        const isoDateString = `${currentDate}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
        const localDate = new Date(isoDateString);


        // Convert to PST (Pacific Standard Time)
        const res = localDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

        console.log('PST Time:');
        console.log(res);
        return res;
    };

    const convertISTToET = (currentHour, currentMinute, amPm, currentDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currentHour, 10);
        const minutes = parseInt(currentMinute, 10);

        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Create a new Date object with the provided date and time using ISO 8601 format
        const isoDateString = `${currentDate}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
        const localDate = new Date(isoDateString);

        // Convert to Eastern Time (ET)
        const etTime = localDate.toLocaleString('en-US', { timeZone: 'America/New_York' });
        console.log(etTime);
        return etTime;
    };

    // FUNCTION TO CONVERT UST TO OTHERS
    const convertUSTToTimeZones = (currHour, currMin, amOrPm, currDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currHour, 10);
        const minutes = parseInt(currMin, 10);

        if (amOrPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amOrPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Extract year, month, and day from the date string
        const [year, month, day] = currDate.split('-').map(Number);

        // Create a new Date object with individual components
        const localDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));

        // Convert to UST (Coordinated Universal Time)
        const ustTime = localDate.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });

        // Convert to IST (Indian Standard Time is UTC+5:30)
        const istOffset = 330; // 5 hours and 30 minutes in minutes
        const istTime = new Date(localDate.getTime() + istOffset * 60000);
        const formattedISTTime = istTime.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });

        // Convert to PST (Pacific Standard Time is UTC-8)
        const pstOffset = -480; // -8 hours in minutes
        const pstTime = new Date(localDate.getTime() + pstOffset * 60000);
        const formattedPSTTime = pstTime.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });

        // Convert to ET (Eastern Time is UTC-5)
        const etOffset = -300; // -5 hours in minutes
        const etTime = new Date(localDate.getTime() + etOffset * 60000);
        const formattedETTime = etTime.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });
        return {
            ustTime,
            istTime: formattedISTTime,
            pstTime: formattedPSTTime,
            etTime: formattedETTime,
        };
    };

    // Function to convert PST TO OTHERS
    const convertPSTToTimeZones = (currHour, currMin, amOrPm, currDate) => {
        // Convert input values to 24-hour format

        let hours = parseInt(currHour, 10);
        const minutes = parseInt(currMin, 10);

        if (amOrPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amOrPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Extract year, month, and day from the date string
        const [year, month, day] = currDate.split('-').map(Number);

        // Create a new Date object with individual components
        const localDate = new Date(year, month - 1, day, hours, minutes);

        // Convert to UST (Coordinated Universal Time)
        const ustTime = localDate.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });

        // Convert to IST (Indian Standard Time is UTC+5:30)
        const istOffset = 330; // 5 hours and 30 minutes in minutes
        const istTime = new Date(localDate.getTime() + istOffset * 60000);
        const formattedISTTime = istTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true });

        // Convert to PST (Pacific Standard Time is UTC-8)
        const pstTime = localDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour12: true });

        // Convert to ET (Eastern Time is UTC-5)
        const etOffset = -300; // -5 hours in minutes
        const etTime = new Date(localDate.getTime() + etOffset * 60000);
        const formattedETTime = etTime.toLocaleString('en-US', { timeZone: 'America/New_York', hour12: true });

        return {
            ustTime,
            istTime: formattedISTTime,
            pstTime,
            etTime: formattedETTime,
        };
    };

    // fUNCTION TO convert ET TO OTHERS
    const convertETToTimeZones = (currHour, currMin, amOrPm, currDate) => {
        // Convert input values to 24-hour format
        let hours = parseInt(currHour, 10);
        const minutes = parseInt(currMin, 10);

        if (amOrPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amOrPm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Extract year, month, and day from the date string
        const [year, month, day] = currDate.split('-').map(Number);

        // Create a new Date object with individual components
        const localDate = new Date(year, month - 1, day, hours, minutes);

        // Convert to UST (Coordinated Universal Time)
        const ustTime = localDate.toLocaleString('en-US', { timeZone: 'UTC', hour12: true });

        // Convert to IST (Indian Standard Time is UTC+5:30)
        const istTime = localDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: true });

        // Convert to PST (Pacific Standard Time is UTC-8)
        const pstTime = localDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour12: true });

        // Convert to ET (Eastern Time is UTC-5)
        const etTime = localDate.toLocaleString('en-US', { timeZone: 'America/New_York', hour12: true });

        return {
            ustTime,
            istTime,
            pstTime,
            etTime,
        };
    };


    // to handle the close functionality
    const [isContainerVisible, setContainerVisibility] = useState(true);

    const closeContainer = () => {
        setContainerVisibility(false);
    };

    return (
        <div>
             {isContainerVisible && (
                <div ref={(node) => drag(drop(node))} style={{ cursor: '', border: '1px solid #ddd', padding: '10px', marginBottom: '5px', display: rem }}>

                <button onClick={closeContainer} className='btn btn-danger ml-5 cstbtn' >x</button>
                <div className='item-prdt'>
                    
                    <label>Select Time Zone:</label>
                    <div className='row'>
                        <div className='col'> <select value={selectedTimeZone} onChange={handleTimeZoneChange}>
                            {timeZones.map((zone) => (
                                <option key={zone.value} value={zone.value}>
                                    {zone.label}
                                </option>
                            ))}
                        </select></div>
                        <div className='col'><h6>Current Date: <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        /></h6></div>
                    </div>
    
    
                    <h1>{text} to {selectedTimeZone}</h1>
    
                    <div className='box-pdt-1-pb' style={{ backgroundColor: `` }}>
                        <div className='row'>
                            <div className='col'>
                                <h5 className='text-capitalize'>Current Time of {text}:{clock}</h5>
                            </div>
                            <div className='col'></div>
                            <div className='col'>
                                <h5>Converted Time and Date:{convetime && (
                                    <>
                                        {convetime}
                                    </>
                                )}</h5>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col'><h6>Picked Date:{selectedDate && (<>
                                {selectedDate}</>)}</h6></div>
                            <div className='col'></div>
                            <div className='col'></div>
                        </div>
                        <div className='row mt-3'>
                            <input
                                type="range"
                                min={0}
                                max={96} // 24 hours * 4 (15-minute intervals)
                                step={1}
                                value={selectedTime}
                                onChange={handleSliderChange}
                            />
    
    
    
                        </div>
                        <div className='row mt-3'>
                            <div className='col'><h6>Selected Time: {formatTime(selectedTime)}</h6></div>
                            <div className='col'></div>
                            <div className='col'><button className='btn btn-primary' onClick={() => (ConvertFunc())}>{text} to {selectedTimeZone}</button></div>
                        </div>
                    </div>
    
                </div>
    
            </div>

             )}

        </div>
        
    );
};

export default DraggableItem;