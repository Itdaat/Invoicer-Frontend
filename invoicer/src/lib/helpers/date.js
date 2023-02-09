/**
 * 
 * @export
 * @param {Date} date 
 */
export function dateToString(date) {
    const dayUnformatted = date.getDate();
    const monthUnformatted = date.getMonth();
    const day = dayUnformatted < 10 ? "0" + dayUnformatted : dayUnformatted;
    const month = monthUnformatted < 10 ? "0" + monthUnformatted : monthUnformatted;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}