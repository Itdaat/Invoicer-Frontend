import { postAuthRequestJson } from "$lib/helpers/apiHelper";
import { emailDataType, phoneDataType } from "../../../consts";

/**
 * 
 * 
 * @export
 * @param {string} firstName 
 * @param {string} lastName 
 * @param {string} nickname 
 * @param {{typeId : number, value : string}[] | null} contactData 
 * @param {[string] | null} personTags  
 * @returns 
 */
export async function createPerson(firstName, lastName, nickname, contactData = null, personTags = null) {
    let error = null;
    const reqBody = {
        firstName,
        lastName,
        nickname,
    };
    const person = await postAuthRequestJson('person/create', reqBody);
    if (person.error) {
        error = person.error;
    }
    const personResult = person.result;
    if (contactData) {
        for (const data of contactData) {
            const personContactDataBody = {
                personId: personResult.id,
                typeId: data.typeId,
                value: data.value
            }
            const res = await postAuthRequestJson('person/contact-data/create', personContactDataBody);
            if (res.error != null) {
                error = res.error;
            }
        }
    }
    if (personTags) {
        for (const tagName of personTags) {
            const personTagBody = {
                personId: personResult.id,
                tagName
            }
            const res = await postAuthRequestJson('person/tag/create', personTagBody);
            if (res.error != null) {
                error = res.error;
            }
        }
    }
    return { error, ok: error === null };
}

/**
 * 
 * 
 * @export
 * @param {string | null} firstName 
 * @param {string | null} lastName 
 * @param {string | null} nickname
 * @param {[{typeId : number, value : string}] | null} contactData 
 * @param {[string] | null} personTags  
 * @returns 
 */
export async function getPersonIds(firstName = null, lastName = null, nickname = null, contactData = null, personTags = null) {
    let personIds = [];
    const reqBody = {
        firstName,
        lastName,
        nickname,
        tags: personTags,
        contactData
    };
    const [person] = (await postAuthRequestJson('person/get', reqBody)).result;
    if (person) {
        personIds.push(person.personId);
    }

    // if (contactData !== null && contactData !== undefined) {
    //     for (const contact of contactData) {
    //         const contactDataBody = {
    //             typeId: contact.typeId,
    //             value: contact.value
    //         };
    //         const contactDataPerson = await postAuthRequestJson('person/contact-data/get', contactDataBody);
    //         const [contactData] = contactDataPerson.result;
    //         if (contactData) {
    //             console.log(contactData);
    //             personIds.push(contactData.personId);
    //         }
    //     }
    // }

    // if (personTags !== null && personTags !== undefined) {
    //     for (const personTag of personTags) {
    //         const personTagBody = {
    //             tagName: personTag.tagName
    //         };
    //         const personTagPerson = await postAuthRequestJson('person/tag/get', personTagBody);
    //         if (personTagPerson) {
    //             console.log(personTagPerson)
    //             personIds.push(personTagPerson.result.id);
    //         }
    //     }
    // }
    return personIds || [];
}

/**
 * 
 * 
 * @export
 * @param {any} [personId=null] 
 * @returns {Promise<import('../../../types/Entities').Response<import('../../../types/Entities').Person[]>>}
 */
export async function getPerson(personId = null) {
    const reqBody = {
        personId
    };
    const person = await postAuthRequestJson('person/get', reqBody);
    return person;
}

/**
 * 
 * 
 * @export
 * @param {number} personId 
 * @returns 
 */
export async function deletePerson(personId) {
    const reqBody = {
        personId
    };
    const result = await postAuthRequestJson('person/delete', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {any} personId 
 * @returns {Promise<{
 *   error : null | {};
 *   result : null | import('../../../types/Entities').Person
 *  }>}
 */
export async function getFullPerson(personId) {
    const reqBody = {
        personId
    };
    const person = await postAuthRequestJson('person/get', reqBody);
    if (person.error) {
        return {
            error: person.error,
            result: null
        }
    }
    const personContactDataBody = {
        personId,
    }
    const personContactData = await postAuthRequestJson('person/contact-data/get', personContactDataBody);
    if (personContactData.error) {
        return {
            error: person.error,
            result: null
        }
    }
    const personTagBody = {
        personId,
    }
    const personTagsData = await postAuthRequestJson('person/tag/get', personTagBody);
    if (personTagsData.error) {
        return {
            error: person.error,
            result: null
        }
    }

    /** @type {Array<import('../../../types/Entities').ContactData>} */
    const contactDatum = personContactData.result;


    return {
        error: null,
        result: {
            ...person.result[0],
            phone: contactDatum.find(el => el.contactDataTypeId == phoneDataType),
            email: contactDatum.find(el => el.contactDataTypeId == emailDataType),
            tags: personTagsData.result
        }
    }
}

/**
 * 
 * 
 * @export
 * @param {number} personId 
 * @param {string | null} firstName 
 * @param {string | null} lastName 
 * @param {string | null} nickname 
 * @param {[{typeId : number, value : string}]} contactData 
 * @param {[{tagName : string}]} personTags 
 */
export async function updateFullPerson(personId, firstName, lastName, nickname, contactData, personTags) {
    let error = {};
    const reqBody = {
        personId,
        firstName,
        lastName,
        nickname,
    };
    const personResult = await postAuthRequestJson('person/update', reqBody);
    if (personResult.error) {
        error = personResult.error;
    }
    for (const data of contactData) {
        const personContactDataBody = {
            personId,
            typeId: data.typeId,
            value: data.value
        }
        const res = await postAuthRequestJson('person/contact-data/update', personContactDataBody);
        if (res.error != null) {
            error = res.error;
        }
    }
    for (const data of personTags) {
        const personTagBody = {
            personId,
            tagName: data.tagName
        }
        const res = await postAuthRequestJson('person/tag/update', personTagBody);
        if (res.error != null) {
            error = res.error;
        }
    }
    return { error }
}
