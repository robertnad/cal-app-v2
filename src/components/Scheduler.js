import React, { useEffect } from 'react';
import Dates from './Dates';
import Hours from './Hours';
import AppointmentButton from './AppointmentButton';
import { dayDataArr } from '../utils/dayHandler';

const Scheduler = () => {

    let limitHelperArr = [];

    // useEffect(() => {
    //     const userLimit = JSON.parse(localStorage.getItem('limitArray'));
    //     if (userLimit) {
    //         limitHelperArr = userLimit;
    //     }
    // }, []);

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