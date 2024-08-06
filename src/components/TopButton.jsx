import React from 'react';

function TopButton({ setQuery }) {
    const cities = [
        { id: 1, city: 'London' },
        { id: 2, city: 'Sydney' },
        { id: 3, city: 'Tokyo' },
        { id: 4, city: 'Toronto' },
        { id: 5, city: 'Paris' }
    ];

    return (
        <div className='flex flex-wrap justify-center gap-4 my-6 px-4'>
            {cities.map((city) => (
                <button
                    key={city.id}
                    className='bg-blue-500 text-white text-lg font-medium px-4 py-2 rounded-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    onClick={() => setQuery(city.city)}
                >
                    {city.city}
                </button>
            ))}
        </div>
    );
}

export default TopButton;
