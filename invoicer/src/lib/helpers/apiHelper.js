import { HostApiUrl, responseErrors, unreachableError } from "../../consts";

/**
 * 
 * 
 * @export
 * @param {import("src/consts").responseError} responseError 
 * @returns 
 */
export function getError(responseError) {
    const error = responseErrors.filter(error => error.code == responseError.code);
    return error.length == 0 ? null : error[0];
}



/**
 * 
 * 
 * @export
 * @param {string} path 
 * @param {{}} body 
 * @returns {Promise<import('../../types/Entities').Response<T | {}>>}
 * @template T
 */
export async function postRequestJson(path, body) {
    try {
        const resultJSON = await fetch(HostApiUrl + path, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },

            body: JSON.stringify(body)
        });
        const result = await resultJSON.json();
        const resultErr = getError(result);
        if (!result || resultErr) {
            return { error: resultErr, result: result || {} };
        }
        return { error: null, result: result };
    } catch (e) { return { error: unreachableError, result: {} } }
}
