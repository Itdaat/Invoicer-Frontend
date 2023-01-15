import GlobalMessageStore from '../stores/GlobalMessage';

/**
 * 
 * 
 * @export
 * @param {string} buttonText 
 * @param {string} message 
 * @param {Function} [func=closeMessage] 
 */
export function openErrorMessage(buttonText, message, func = closeMessage) {
    GlobalMessageStore.set({ status: 'error', buttonText, message, func })
}


/**
 * @export
 * @param {string} buttonText 
 * @param {string} message 
 * @param {Function} [func=closeMessage] 
 */
export function openSuccessMessage(buttonText, message, func = closeMessage) {
    GlobalMessageStore.set({ status: 'success', buttonText, message, func })
}

export function closeMessage() {
    GlobalMessageStore.set({ status: 'ordinary', buttonText: '', message: '' })
}

