import React from 'react';
import { scheduleHours } from '../utils/scheduleHours';

const Hours = () => {


    return (

        <>
            {scheduleHours.map(hour => (
                <div className="item-static" key={hour}>{hour}</div>
            ))}
        </>

    );
}

export default Hours;