import { postAuthRequestJson } from '$lib/helpers/apiHelper';
import { TRANSPORT_TRAILER, TRANSPORT_TRUCK } from '../../../consts';

/**
 * 
 * 
 * @export
 * @param {string} name 
 * @param {string} licenseNumber 
 * @param {string} transportBrand 
 */
export async function createTrailer(name, licenseNumber, transportBrand) {
    const reqBody = {
        name, licenseNumber, transportBrand, transportTypeId: TRANSPORT_TRAILER
    };
    const result = await postAuthRequestJson('transport/create', reqBody);
    return result;
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
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Transport[]>>}
 */
export async function getTrucks(id = null, name = null, licenseNumber = null, transportBrand = null) {
    const reqBody = {
        id, name, licenseNumber, transportBrand, transportTypeId: TRANSPORT_TRUCK
    };
    const result = await postAuthRequestJson('transport/get', reqBody);
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
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Transport[]>>}
 */
export async function getTrailers(id = null, name = null, licenseNumber = null, transportBrand = null) {
    const reqBody = {
        id, name, licenseNumber, transportBrand, transportTypeId: TRANSPORT_TRAILER
    };
    const result = await postAuthRequestJson('transport/get', reqBody);
    return result;
}