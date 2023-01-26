/**
 * @param {Date | string} date
 */
export function formateDate(date) {
    // if date is string make it Date
    if (typeof date === 'string') {
        date = new Date(date);
    }
    // set days from date with 0 if < 10
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    // set months from date with 0 if < 10
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    // set years from date
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// format first last name nickname
/**
 * 
 * 
 * @export
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} nickname 
 * @returns 
 */
export function formatName(firstName, lastName, nickname) {
    if (nickname) {
        return `${nickname} (${firstName} ${lastName})`;
    } else {
        return `${firstName} ${lastName}`;
    }
}