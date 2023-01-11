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
    const firms = await getFirms();
    const firm = firms.result.filter(el => el.id == firmId);
    return {
        error: null,
        result: firm[0]
    }
}

export function getCurrentFirm() {
    return JSON.parse(getCookie('firmId') || '{}');
}

export async function setCurrentFirm() {
    const currentFirm = getCookie('firmId');
    if (currentFirm) {
        return currentFirm;
    }
    const firms = await getFirms();
    setCookie('firmId', firms.result[0].id);
    return firms.result[0]
}

/**
 * 
 * 
 * @export
 * @param {string} firmId 
 * @returns {Promise<boolean>}
 */
export async function changeFirm(firmId) {
    const firm = await getFirm(firmId);
    if (!firm.result || firm.error) {
        return false;
    }
    setCookie('firmId', firm.result.id.toString());
    // setCookie('firmId', "2");
    localStorage.setItem('firm', JSON.stringify(firm.result));
    return true;
}