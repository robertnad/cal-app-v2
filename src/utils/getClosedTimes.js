import moment from 'moment';

const isSecondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
const isFourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();

export const getClosedTimes = (array, index) => {
    const parsedDate = parseInt(array[index].substring(4, 6));
    const parsedTime = parseInt(array[index].slice(7))
    const isPairSaturday = array[index].includes('Sat') && (parsedDate === isSecondSaturday || parsedDate === isFourthSaturday);
    const isOddSaturday = array[index].includes('Sat') && !isPairSaturday;
    const isSunday = array[index].includes('Sun');
    const isWeekday = !isSunday && !isPairSaturday && !isOddSaturday;
    const isEvenWeekday = isWeekday && (parsedDate % 2 === 0);
    const isOddWeekday = isWeekday && !isEvenWeekday;
    const isMorningShift = (isEvenWeekday || isPairSaturday) && (parsedTime > 1330);
    const isAfternoonShift = isOddWeekday && (parsedTime < 1300);
    const isClosed = isSunday || isOddSaturday || isMorningShift || isAfternoonShift;
    return isClosed;
}
