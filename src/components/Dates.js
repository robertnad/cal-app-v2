import React from 'react';
import { visibleDays } from '../utils/visibleDays';

const Dates = () => {

    return (

        <div className="grid">

            <div className="grid column-hours">
                <div className="item-static"></div>
            </div>

            <div className="grid columns-appointments">
                {visibleDays.map(date => (
                    <div className="item-static" key={date}>{date}</div>
                ))}
            </div>

        </div>

    );
}

export default Dates;