/**
 * 
 * 
 * @export
 * @param {string | undefined} userId 
 * @returns {Promise<import('../../types/Entities').Firm[]>}
 */
export async function getFirms(userId) {
    console.log(userId);
    return [{
        id: '123',
        name: 'GazdaPlus'
    }]
}
