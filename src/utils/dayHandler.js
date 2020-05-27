import { visibleDays } from './visibleDays';
import { scheduleHours } from './scheduleHours';
import { getClosedTimes } from './getClosedTimes';
import { getPauseTime } from './getPauseTime';
import { randomAppointments } from './randomAppointment'

// dates in splitted format [["Mon", "25"], ...]
const visibleDaysSplitted = visibleDays.map(date => 
    date.split(' ')
);

// dates in ['Mon_25', ...] format
const visibleDaysFormatted = visibleDaysSplitted.map(date => 
    (date[0] + '_' + date[1])
);

// hours in splitted format [["hh", "mm"], ...]
const scheduleHoursSplitted = scheduleHours.map(time => 
    time.split(':')
);

// hours in joined format ["hhmm", ...]
const scheduleHoursFormatted = scheduleHoursSplitted.map(time => 
    parseInt(time[0] + time[1])
);

// array that holds dd_hhmm format
let dateTimeFormat = [];

// pushes dd_hhmm format to dateTimeArr
scheduleHoursFormatted.map(time => (
    visibleDaysFormatted.map(date =>
        dateTimeFormat.push(date + '_' + time)
    )
));

// final array that will contain object for every day
export let dayDataArr = [];

// populating the final array
for(let i=0; i<dateTimeFormat.length; i++){
    dayDataArr[i] = {
        id: dateTimeFormat[i],
        // dateInt: parseInt(dateTimeFormat[i].substring(4, 6)),
        // timeInt: parseInt(dateTimeFormat[i].slice(7)),
        isPause: getPauseTime(dateTimeFormat, i),
        isClosed: getClosedTimes(dateTimeFormat, i),
        isTaken: randomAppointments.includes(dateTimeFormat[i]),
        isClicked: false
    };
}

export const limitHelperArr = [];