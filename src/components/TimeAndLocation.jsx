import React, { useState, useEffect } from 'react';

function TimeAndLocation({ weather: { formattedLocalTime, name, country } }) {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date().toLocaleString('en-US', {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            const time = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            setCurrentTime(`${date} | Local Time: ${time}`);
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='text-white px-4 md:px-6 lg:px-8'>
            <div className='flex items-center justify-center my-4 md:my-6'>
                <p className='text-lg md:text-xl lg:text-2xl font-light text-center'>
                    {currentTime}
                </p>
            </div>
            <div className='flex items-center justify-center my-3'>
                <p className='text-2xl md:text-3xl lg:text-4xl text-center font-semibold'>
                    {name}, {country}
                </p>
            </div>
        </div>
    );
}

export default TimeAndLocation;
