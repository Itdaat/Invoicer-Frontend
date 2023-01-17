/**
 * 
 * 
 * @export
 * @param {string} p 
 * @returns 
 */
export function isValidTelNum(p) {
    const isValid = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(p);
    return isValid;
}