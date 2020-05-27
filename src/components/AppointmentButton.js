import React, { useState, useEffect } from 'react';
// import { limitHelperArr } from '../utils/dayHandler';

const AppointmentButton = ({ appointmentData, limitHelperArr }) => {

    const [appointment, setAppointment] = useState({
        id: appointmentData.id,
        isPause: appointmentData.isPause,
        isClosed: appointmentData.isClosed,
        isTaken: appointmentData.isTaken,
        isClicked: appointmentData.isClicked
    });

    // get date format from appointment id
    const dateInt = parseInt(appointment.id.substring(4, 6));
    
    // gets stored appointments from localStorage and initializes appointment state after refresh
    useEffect(() => {
        const appointments = JSON.parse(localStorage.getItem(appointment.id));
        if (appointments) {
            setAppointment(appointments);
        }
        // for clicked appointments save the date to the limiter array to restrict user for picking new appointments
        if (appointments !== null) {
            if (appointments.isClicked) {
                limitHelperArr.push(dateInt);
            }
        }
    }, []);

    // updates localStorage everytime new appointment (that is not disabled) is added
    useEffect(() => {
        if (!appointment.isClosed && !appointment.isPause && !appointment.isTaken) {
            localStorage.setItem(appointment.id, JSON.stringify(appointment));
        }
        // save the state of limiter array to prevent multiple user input after refresh
        localStorage.setItem('limitArray', JSON.stringify(limitHelperArr))
    }, [appointment]);

    // onclick handler - adds appointment, also handles 1/day and 2/week limits
    const handleAppointment = () => {
        if (!appointment.isTaken && limitHelperArr.length === 0) {
            setAppointment({
                id: appointment.id,
                isPause: appointment.isPause,
                isClosed: appointment.isClosed,
                isTaken: appointment.isTaken,
                isClicked: true
            });
            limitHelperArr.push(dateInt);
        } else if (!appointment.isTaken && limitHelperArr.length === 1 && limitHelperArr[0] !== dateInt) {
            setAppointment({
                id: appointment.id,
                isPause: appointment.isPause,
                isClosed: appointment.isClosed,
                isTaken: appointment.isTaken,
                isClicked: true
            });
            limitHelperArr.push(dateInt);
        }
        // unclick button - deletes appointment
        if (appointment && appointment.isClicked && !appointment.isTaken) {
            setAppointment({
                id: appointment.id,
                isPause: appointment.isPause,
                isClosed: appointment.isClosed,
                isTaken: appointment.isTaken,
                isClicked: false
            });
            limitHelperArr.splice(limitHelperArr.indexOf(dateInt), 1);
        }
    }

    // function to change button className for styling purposes
    const handleButtonStyle = () => {
        if (appointment && appointment.isClicked && !appointment.isClosed && !appointment.isPause && !appointment.isTaken) {
            return 'btn--clicked';
        }
        else if (appointment.isPause) {
            return 'btn--pause';
        }
        else if (appointment.isClosed) {
            return 'btn--closed';
        }
        else if (appointment.isTaken) {
            return 'btn--taken'
        }
        return 'btn';
    }

    return (
        <>
            <button
                className={handleButtonStyle()}
                onClick={handleAppointment}
                disabled={appointment.isClosed || appointment.isPause || appointment.isTaken}>
            </button>
        </>
    );
}

export default AppointmentButton;