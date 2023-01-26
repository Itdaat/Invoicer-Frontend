import { postAuthRequestJson } from '$lib/helpers/apiHelper';
import { getCookie, setCookie } from '$lib/helpers/cookies';
import { emailDataType, legalAddressType, paymentIban, phoneDataType, postalAddressType } from '../../../consts';

/**
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Firm[]>>}
 */
export async function getFirms() {
    const firms = await postAuthRequestJson('firm/get', {});
    return firms;
}
/**
 * @param {string | null} firmId
 * @export
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Firm>>}
 */
export async function getFirm(firmId = null) {
    const firm = await postAuthRequestJson('firm/get', { firmId });
    return firm;
}

// create firm  
/**
 * 
 * 
 * @export
 * @param {string} name 
 * @param {string} taxNumber 
 * @param {string} email 
 * @param {string} phone 
 * @param {import('../../../types/Entities').Address} legalAddress 
 * @param {import('../../../types/Entities').Address} postalAddress 
 * @param {string} ibanCode 
 * @returns 
 */
export async function createFirm(name, taxNumber, email, phone, legalAddress, postalAddress, ibanCode) {
    const mainReqBody = {
        name, taxNumber
    }
    const firm = await postAuthRequestJson('firm/create', mainReqBody);
    if (firm.error) {
        return firm;
    }

    const firmId = firm.result.id;

    const emailReqBody = {
        typeId: emailDataType,
        value: email,
        firmId: firmId
    }
    const emailRes = await postAuthRequestJson('firm/contact-data/create', emailReqBody);
    if (emailRes.error) {
        return emailRes;
    }

    const phoneReqBody = {
        typeId: phoneDataType,
        value: phone,
        firmId: firmId
    }
    const phoneRes = await postAuthRequestJson('firm/contact-data/create', phoneReqBody);
    if (phoneRes.error) {
        return phoneRes;
    }

    const ibanReqBody = {
        typeId: paymentIban,
        value: ibanCode,
        firmId: firmId
    }
    const ibanRes = await postAuthRequestJson('firm/payment-data/create', ibanReqBody);
    if (ibanRes.error) {
        return ibanRes;
    }

    const legalReqBody = {
        ...legalAddress,
        typeId: legalAddressType,
        firmId: firmId
    }
    const legalRes = await postAuthRequestJson('firm/address/create', legalReqBody);
    if (legalRes.error) {
        return legalRes;
    }

    const postalReqBody = {
        ...postalAddress,
        typeId: postalAddressType,
        firmId: firmId
    }
    const postalRes = await postAuthRequestJson('firm/address/create', postalReqBody);
    if (postalRes.error) {
        return postalRes;
    }

    return firm;
}

export function getCurrentFirm() {
    return JSON.parse(getCookie('firmId') || '{}');
}

export async function setCurrentFirm(firmId = null) {
    // const currentFirm = getCookie('firmId');
    // if (currentFirm) {
    //     return currentFirm;
    // }
    const firm = await getFirm(firmId);
    setCookie('firmId', firm.result.id);
    return firm.result.id;
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
    localStorage.setItem('firm', JSON.stringify(firm.result));
    return true;
}