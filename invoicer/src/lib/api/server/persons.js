import { postAuthRequestJson } from "$lib/helpers/apiHelper";
import { driver, emailDataType, phoneDataType } from "../../../consts";

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
    const reqBody = {
        firstName,
        lastName,
        nickname,
        tags: personTags,
        contactData
    };
    const persons = (await postAuthRequestJson('person/get', reqBody)).result;

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
    return persons;
}


/**
 * 
 * 
 * @export
 * 
 * @param {string | null} firstName 
 * @param {string | null} lastName 
 * @param {string | null} nickname
 * @param {[{typeId : number, value : string}] | null} contactData 
 * @param {[string] | null} personTags  
 * @returns 
 */
/**
 * 
 * 
 * @export
 * @param {import('../../../types/Entities').Person} filter 
 * @returns {Promise<import('../../../types/Entities').Person[]>}
 * 
 */
export async function getPersonAllFields(filter) {
    const contactDataUpdated = [];
    contactDataUpdated[phoneDataType] = filter?.phone
    contactDataUpdated[emailDataType] = filter?.email
    let reqBody;
    if (contactDataUpdated.length == 0) {
        reqBody = {
            firstName: filter.firstName,
            lastName: filter.lastName,
            nickname: filter.nickname,
            tags: filter.tags,
        };

    } else {

        reqBody = {
            firstName: filter.firstName,
            lastName: filter.lastName,
            nickname: filter.nickname,
            tags: filter.tags,
            contactData: contactDataUpdated
        };
    }
    const persons = (await postAuthRequestJson('person/get', reqBody)).result;

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
    return persons;
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
 * @param {string} personId 
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
 * @param {string} personId 
 * @param {string | null} firstName 
 * @param {string | null} lastName 
 * @param {string | null} nickname 
 * @param {[{id: string, typeId : number, value : string}] | []} contactData 
 */
export async function updateFullPerson(personId, firstName = null, lastName = null, nickname = null, contactData = []) {
    const reqBody = {
        personId,
        firstName,
        lastName,
        nickname,
    };
    const personResult = await postAuthRequestJson('person/update', reqBody);
    if (personResult.error) {
        return personResult.error
    }
    for (const data of contactData) {
        const personContactDataBody = {
            personId,
            contactDataId: data.id,
            typeId: data.typeId,
            value: data.value
        }
        const res = await postAuthRequestJson('person/contact-data/update', personContactDataBody);
        if (res.error != null) {
            return res.error;
        }
    }
    return {}
}


export async function getDriverAutocomplete(name) {
    let nickName = await getPersonAllFields({ nickname: name });
    let drivers = [...nickName];
    if (name) {
        let firstName = await getPersonAllFields({ firstName: name });
        let lastName = await getPersonAllFields({ lastName: name });
        let phone = await getPersonAllFields({ phone: name });
        let email = await getPersonAllFields({ email: name });
        drivers = [
            ...nickName,
            ...firstName,
            ...lastName,
            ...phone,
            ...email
        ]
    }
    let driversRes = [];
    drivers.forEach((driverRes) => {
        let nickname = '';
        if (driverRes.nickname) {
            nickname = ' (' + driverRes.nickname + ')';
        }
        const newDriver = driverRes.firstName + ' ' + driverRes.lastName + nickname;
        driversRes.push({
            value: newDriver,
            name: newDriver,
            pseudoValue: driverRes.id
        });
    })
    return driversRes;
}