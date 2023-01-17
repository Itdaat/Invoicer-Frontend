import GlobalMessageStore from '../stores/GlobalMessage';

/**
 * 
 * 
 * @export
 * @param {string} buttonText 
 * @param {string} message 
 * @param {number} timeout 
 * @param {Function} [func=closeMessage] 
 */
export async function openErrorMessage(message, buttonText, timeout = 5000, func = closeMessage) {
    await setTimeout(() => { }, 700)
    /**
     * @type {number}
     */
    let id;
    // @ts-ignore
    GlobalMessageStore.update(old => {
        const lastId = old.lastId + 1;
        id = lastId;
        return {
            lastId: lastId,
            arr: [
                ...old.arr,
                {
                    id: lastId,
                    buttonText,
                    message,
                    func,
                    timeout,
                    status: 'error',
                }
            ]
        }
    })

    setTimeout(() => {
        closeMessage(id);
    }, timeout);
}


/**
 * @export
 * @param {string} buttonText 
 * @param {string} message 
 * @param {number} timeout 
 * @param {Function} [func=closeMessage] 
 */
export async function openSuccessMessage(message, buttonText, timeout = 5000, func = closeMessage) {
    await setTimeout(() => { }, 700)
    /**
     * @type {number}
     */
    let id;
    // @ts-ignore
    GlobalMessageStore.update(old => {
        id = old.lastId + 1;
        return {
            lastId: old.lastId + 1,
            arr: [
                ...old.arr,
                {
                    id: old.lastId + 1,
                    buttonText,
                    message,
                    func,
                    timeout,
                    status: 'success',
                }
            ]
        }
    })

    setTimeout(() => {
        closeMessage(id);
    }, timeout);
}

/**
 * 
 * 
 * @export
 * @param {number} id 
 */
export function closeMessage(id) {
    // @ts-ignore
    GlobalMessageStore.update(old => {
        const arr = old.arr.filter(message => message.id != id);
        return {
            arr,
            lastId: old.lastId
        }
    })
}

export function closeMessages() {
    // @ts-ignore
    GlobalMessageStore.update(old => {
        return {
            arr: [],
            lastId: old.lastId
        }
        // old.arr.forEach((value) => {
        //     if (value.id == id) {
        //         delete old.arr[id];
        //     }
        // })
    })
}
