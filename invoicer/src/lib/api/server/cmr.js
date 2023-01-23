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
 * @param {string | null} externalNumber 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').CMR[]>>}
 */
export async function updateCmr(id, externalNumber = null) {
    const reqBody = {
        cmrId: id,
        externalNumber
    };
    const result = await postAuthRequestJson('cmr/update', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {string} cmrId 
 * @returns 
 */
export async function deleteCmr(cmrId) {
    const reqBody = {
        cmrId
    };
    const result = await postAuthRequestJson('cmr/delete', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {import('../../../types/Entities').CMR} filter 
 */
export async function getCmrAllFields(filter) {
    const reqBody = {
        externalNumber: filter.externalNumber
    }
    const result = await postAuthRequestJson('cmr/get', reqBody);
    return result;
}