import { postAuthRequestJson } from '$lib/helpers/apiHelper';

export async function createTrailer() {

}

/**
 * 
 * 
 * @export
 * @param {string} name 
 * @param {string} licenseNumber 
 * @param {string} transportBrand 
 * @param {number} transportTypeId 
 */
export async function createTruck(name, licenseNumber, transportBrand, transportTypeId) {
    const reqBody = {
        name, licenseNumber, transportBrand, transportTypeId
    };
    const result = await postAuthRequestJson('transport/create', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {string | null} [id=null] 
 * @param {string | null} [name=null] 
 * @param {string | null} [licenseNumber=null] 
 * @param {string | null} [transportBrand=null] 
 * @param {string | null} [transportTypeId=null] 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Transport[]>>}
 */
export async function getTrucks(id = null, name = null, licenseNumber = null, transportBrand = null, transportTypeId = null) {
    const reqBody = {
        id, name, licenseNumber, transportBrand, transportTypeId
    };
    const result = await postAuthRequestJson('transport/get', reqBody);
    return result;
}