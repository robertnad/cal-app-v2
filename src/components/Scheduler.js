import React, { useEffect } from 'react';
import Dates from './Dates';
import Hours from './Hours';
import AppointmentButton from './AppointmentButton';
import { dayDataArr } from '../utils/dayHandler';

const Scheduler = () => {

    // holds dates of user appointments - restricts user to 1 appointment a day and 2 per week
    let limitHelperArr = [];

    return (
        <div>
            
            <div className="grid columns-dates">
                <Dates />
            </div>
            
            <div className="grid">
                
                <div className="grid column-hours">
                    <Hours />
                </div>

                <div className="grid columns-appointments">
                    {dayDataArr.map(appointment => (
                        <AppointmentButton
                            key={appointment.id}
                            appointmentData={appointment}
                            limitHelperArr={limitHelperArr}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Scheduler;