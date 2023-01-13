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