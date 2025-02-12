export function getNewId() {
    // generate a new date and time based unique id (unique to a millisecond)
    // so basically a timestamp T_T
    // format : year-month-date-time(in ms)

    const date = new Date();
    const id = `${date.getFullYear()}${String(date.getMonth() + 1)
        .padStart(2, '0')}${String(date.getDate())
        .padStart(2, '0')}${date.getTime()}`;
    
    return id;
}