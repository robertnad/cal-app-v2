import moment from 'moment';

const isSecondSaturday = moment().startOf('month').day('Saturday').add(7,'d').date();
const isFourthSaturday = moment().startOf('month').day('Saturday').add(21,'d').date();

export const getPauseTime = (array, index) => {
    const parsedDate = parseInt(array[index].substring(4, 6));
    const parsedTime = parseInt(array[index].slice(7))
    const isPairSaturday = array[index].includes('Sat') && (parsedDate === isSecondSaturday || parsedDate === isFourthSaturday);
    const isOddSaturday = array[index].includes('Sat') && !isPairSaturday;
    const isSunday = array[index].includes('Sun');
    const isWeekday = !isSunday && !isPairSaturday && !isOddSaturday;
    const isEvenWeekday = isWeekday && (parsedDate % 2 === 0);
    const isOddWeekday = isWeekday && !isEvenWeekday;
    const isMorningPause = (isEvenWeekday || isPairSaturday) && (parsedTime === 1100);
    const isAfternoonPause = isOddWeekday && (parsedTime === 1600);
    const isPause = isMorningPause || isAfternoonPause;
    return isPause;
}