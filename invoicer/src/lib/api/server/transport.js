import { postAuthRequestJson } from '$lib/helpers/apiHelper';
import { trailers, TRANSPORT_TRAILER, TRANSPORT_TRUCK, trucks } from '../../../consts';

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
 * @param {string} transportBrandName 
 * @returns 
 */
export async function createTruck(licenseNumber, transportBrandName) {
    const reqBody = {
        licenseNumber, transportBrandName, transportTypeId: TRANSPORT_TRUCK
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
 * @param {string | null} [transportBrandName=null] 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Transport[]>>}
 */
export async function getTrucks(id = null, name = null, licenseNumber = null, transportBrandName = null) {
    const reqBody = {
        id, name, licenseNumber, transportBrandName, transportTypeId: TRANSPORT_TRUCK
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
 * @param {string | null} [transportBrandName=null] 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Transport[]>>}
 */
export async function getTrailers(id = null, name = null, licenseNumber = null, transportBrandName = null) {
    const reqBody = {
        id, name, licenseNumber, transportBrandName, transportTypeId: TRANSPORT_TRAILER
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

export async function getTrucksAutocomplete(truckLicense) {
    let trucks = await getTrucks(null, null, truckLicense, null);

    if (truckLicense) {
        let trucksBrand = await getTrucks(null, null, null, truckLicense);
        trucks.result = [...trucks.result, ...trucksBrand.result];
    }

    if (!trucks.result) {
        return;
    }
    /**
     * @type {{ value: string; name: string;}[]}
     */
    let trucksRes = [];
    trucks.result.forEach((truckRes) => {
        let brandName = '';
        if (truckRes.brandName) {
            brandName = ' (' + truckRes.brandName + ')';
        }
        const newTruck = truckRes.licenseNumber + brandName;
        trucksRes.push({
            value: truckRes.licenseNumber,
            name: newTruck
        });
    });
    return trucksRes;
}

export async function getTrailersAutocomplete(trailerLicense) {
    let trailers = await getTrailers(null, null, trailerLicense);

    if (trailerLicense) {
        let trailerBrand = await getTrailers(null, null, null, trailerLicense);
        trailers.result = [...trailers.result, ...trailerBrand.result];
    }

    if (!trailers.result) {
        return;
    }
    /**
     * @type {{ value: string; name: string;}[]}
     */
    let trailersRes = [];
    trailers.result.forEach((trailerRes) => {
        let brandName = '';
        if (trailerRes.brandName) {
            brandName = ' (' + trailerRes.brandName + ')';
        }
        const newTrailer = trailerRes.licenseNumber + brandName;
        trailersRes.push({
            value: trailerRes.licenseNumber,
            name: newTrailer
        })
    });
    return trailersRes;
}