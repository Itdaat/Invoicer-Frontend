import { postAuthRequestJson } from '$lib/helpers/apiHelper';
import { TRANSPORT_TRAILER, TRANSPORT_TRUCK } from '../../../consts';

/**
 * 
 * @export
 * @param {string} licenseNumber 
 * @param {string} transportBrand 
 */
export async function createTrailer(licenseNumber, transportBrand) {
    const reqBody = {
        licenseNumber, transportBrand, transportTypeId: TRANSPORT_TRAILER
    };
    const result = await postAuthRequestJson('transport/create', reqBody);
    return result;
}

/**
 * 
 * @export
 * @param {string} licenseNumber 
 * @param {string} transportBrand 
 * @returns 
 */
export async function createTruck(licenseNumber, transportBrand) {
    const reqBody = {
        licenseNumber, transportBrand, transportTypeId: TRANSPORT_TRUCK
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

/**
 * 
 * 
 * @export
 * @param {{ brand?: any; licenseNumber?: any; }} filter
 */
export async function getTrailersAllFields(filter) {
    const reqBody = {
        transportBrandName: filter.brand,
        licenseNumber: filter.licenseNumber,
        transportTypeId: TRANSPORT_TRAILER
    };
    const result = await postAuthRequestJson('transport/get', reqBody);
    return result;
}

export async function getTrucksAllFields(filter) {
    const reqBody = {
        transportBrandName: filter.brand,
        licenseNumber: filter.licenseNumber,
        transportTypeId: TRANSPORT_TRUCK
    };
    const result = await postAuthRequestJson('transport/get', reqBody);
    return result;
}

export async function deleteTruck(transportId) {
    const reqBody = {
        transportId
    };
    const result = await postAuthRequestJson('transport/delete', reqBody);
    return result;
}

export async function deleteTrailer(transportId) {
    const reqBody = {
        transportId
    };
    const result = await postAuthRequestJson('transport/delete', reqBody);
    return result;
}

export async function updateTruck(id, transportBrandName) {
    const reqBody = {
        transportId: id, transportBrandName, transportTypeId: TRANSPORT_TRUCK
    };
    const result = await postAuthRequestJson('transport/update', reqBody);
    return result;
}

export async function updateTrailer(id, transportBrandName) {
    const reqBody = {
        transportId: id, transportBrandName, transportTypeId: TRANSPORT_TRAILER
    };
    const result = await postAuthRequestJson('transport/update', reqBody);
    return result;
}