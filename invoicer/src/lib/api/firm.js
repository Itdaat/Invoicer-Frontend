import FirmStore from '../stores/Store';

/**
 * 
 * 
 * @export
 * @param {string} userId 
 * @returns {Promise<import('../../types/Entities').Firm[]>}
 */
export async function getFirms(userId) {
    console.log(userId);
    return [{
        id: '123',
        name: 'GazdaPlus'
    }]
}

/**
 * 
 * 
 * @export
 * @param {string} userId 
 * @param {string} firmId
 * @returns {Promise<import('../../types/Entities').Firm>}
 */
export async function getFirm(userId, firmId = '') {
    console.log(userId || firmId);
    return {
        id: '123',
        name: 'GazdaPlus'
    }
}

/**
 * 
 * 
 * @export
 * @param {string} userId 
 */
export async function setDefaultFirm(userId) {
    const firm = await getFirm(userId);
    FirmStore.set(firm);
}