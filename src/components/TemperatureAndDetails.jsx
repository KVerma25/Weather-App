import React from 'react';
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FiWind } from 'react-icons/fi';
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';

function TemperatureAndDetails({ weather: { icon, details, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like }, units }) {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: 'Real Feel',
            value: `${units !== 'metric' ? feels_like.toFixed() : (feels_like - 273).toFixed()}°`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: 'Humidity',
            value: `${humidity}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: 'Wind',
            value: `${speed} km/h`
        }
    ];

    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: 'Sunrise',
            value: `${sunrise}`
        },
        {
            id: 2,
            Icon: GiSunset,
            title: 'Sunset',
            value: `${sunset}`
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: 'High',
            value: `${units !== 'metric' ? temp_max.toFixed() : (temp_max - 273).toFixed()}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: 'Low',
            value: `${units !== 'metric' ? temp_min.toFixed() : (temp_min - 273).toFixed()}°`
        }
    ];

    return (
        <div className='text-white px-4 md:px-6 lg:px-8'>
            {/* Weather Details Header */}
            <div className='text-cyan-300 text-xl md:text-2xl text-center py-6'>
                <p>{details}</p>
            </div>

            {/* Weather Main Info */}
            <div className='flex flex-col md:flex-row items-center justify-between py-3'>
                <img src={icon} alt="Weather Icon" className='w-20 md:w-24 lg:w-28' />

                <p className='text-4xl md:text-5xl lg:text-6xl'>
                    {units !== 'metric' ? temp.toFixed() : (temp - 273).toFixed()}°
                </p>

                <div className='flex flex-col space-y-2 md:space-y-3 items-start'>
                    {verticalDetails.map(detail => (
                        <div className='flex items-center text-sm md:text-base' key={detail.id}>
                            <detail.Icon size={20} className='mr-2' />
                            <span className='font-light'>{detail.title}:</span>
                            <span className='font-medium ml-1'>{detail.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Horizontal Details */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 text-sm md:text-base py-3">
                {horizontalDetails.map(detail => (
                    <div className='flex items-center' key={detail.id}>
                        <detail.Icon size={24} className='mr-2' />
                        <p className='font-light'>
                            {detail.title}:
                            <span className='font-medium ml-1'>{detail.value}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemperatureAndDetails;
