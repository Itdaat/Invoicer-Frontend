import { postAuthRequestJson } from "$lib/helpers/apiHelper";

/**
 * 
 * 
 * @export
 * @param {string} externalNumber 
 * @returns 
 */
export async function createCmr(externalNumber) {
    const reqBody = {
        externalNumber
    };
    const result = await postAuthRequestJson('cmr/create', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {number | string | null} id
 * @param {string | null} externalNumber 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').CMR[]>>}
 */
export async function getCmr(id = null, externalNumber = null) {
    const reqBody = {
        cmrId: id,
        externalNumber
    };
    const result = await postAuthRequestJson('cmr/get', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {number | string} id 
 * @param {string} externalNumber 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').CMR[]>>}
 */
export async function updateCmr(id, externalNumber) {
    const reqBody = {
        cmrId: id,
        externalNumber
    };
    const result = await postAuthRequestJson('cmr/update', reqBody);
    return result;
}