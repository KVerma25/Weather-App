import React from 'react';

function Forecast({ title, data, units }) {
    return (
        <div className='text-white px-4 md:px-8'>
            <div className='flex flex-col md:flex-row items-center justify-start mt-6'>
                <p className='font-medium uppercase text-lg md:text-xl'>{title}</p>
            </div>
            <hr className='my-2' />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {
                    data.map((d, index) => (
                        <div key={index} className='flex flex-col items-center justify-center p-2'>
                            <p className='font-light text-xs md:text-sm'>{d.title}</p>
                            <img src={d.icon} alt="icon" className='w-10 h-10 md:w-12 md:h-12 my-1' />
                            <p className='font-medium text-xs md:text-sm'>
                                {`${units !== 'metric' ? d.temp.toFixed() : (d.temp - 273).toFixed()}°`}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


export default Forecast;
