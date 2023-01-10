import { getCookie, setCookie } from '$lib/helpers/cookies';

/**
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Firm[]>>}
 */
export async function getFirms() {
    // const token = getToken() || '';
    return {
        error: null,
        result: [
            {
                id: '1',
                name: 'Super',
                messageCount: 0
            },
            {
                id: '2',
                name: 'Koala',
                messageCount: 2
            }
        ]
    }
}
/**
 * @param {string | undefined} firmId
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Firm>>}
 */
export async function getFirm(firmId) {
    firmId;
    return {
        error: null,
        result: {
            id: '1',
            name: 'Super',
            messageCount: 0
        }

    }
}

export function getCurrentFirm() {
    return JSON.parse(getCookie('firm') || '{}');
}

export async function setCurrentFirm() {
    const currentFirm = getCookie('firm');
    if (currentFirm) {
        return currentFirm;
    }
    const firms = await getFirms();
    setCookie('firm', JSON.stringify(firms.result[0]));
    return firms.result[0]
}