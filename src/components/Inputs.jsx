import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const API_KEY = 'fac212aa02e4f547904284e478944ebc';

function Inputs({ setUnits, setQuery, setLongitude, setLatitude }) {
    const [city, setCity] = useState('');

    function handleSearch() {
        if (city !== '') {
            setQuery(city);
        }
    }

    function handleLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    try {
                        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`);
                        const data = await response.json();
                        const cityName = data.city.name;
                        setQuery(cityName);
                    } catch (error) {
                        console.error('Error getting city:', error);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported.');
        }
    }

    return (
        <div className='flex flex-col md:flex-row items-center justify-between my-6 px-4 md:px-8'>
            <div className='flex flex-col md:flex-row w-full md:w-3/4 items-center justify-center space-y-4 md:space-y-0 md:space-x-4'>
                <input
                    type="text"
                    value={city}
                    className='text-xl text-gray-500 font-light p-2 w-full shadow-xl capitalize focus:outline-none'
                    placeholder='Search'
                    onChange={(e) => setCity(e.currentTarget.value)}
                />

                <div className='flex space-x-4'>
                    <FaSearch
                        size={25}
                        className='text-white cursor-pointer transition ease-out hover:scale-125'
                        onClick={handleSearch}
                    />
                    <FaLocationDot
                        size={25}
                        className='text-white cursor-pointer transition ease-out hover:scale-125'
                        onClick={handleLocation}
                    />
                </div>
            </div>

            <div className='flex flex-row items-center justify-center mt-4 md:mt-0'>
                <button
                    name='metric'
                    className='text-white text-xl md:text-2xl font-medium hover:scale-125'
                    onClick={() => setUnits('metric')}
                >
                    °C
                </button>
                <p className='text-xl md:text-2xl font-medium mx-2 text-white'>|</p>
                <button
                    name='imperial'
                    className='text-white text-xl md:text-2xl font-medium hover:scale-125'
                    onClick={() => setUnits('imperial')}
                >
                    °K
                </button>
            </div>
        </div>
    );
}

export default Inputs;
