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
 * @returns {Promise<{error: import("src/consts").responseError | null, resultJSON : {}}>}
 */
export async function postRequestJson(path, body) {
    try {
        const result = await fetch(HostApiUrl + path, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },

            body: JSON.stringify(body)
        });
        const resultJSON = await result.json();
        const resultErr = getError(resultJSON);
        if (!resultJSON || resultErr) {
            return { error: resultErr, resultJSON: resultJSON || {} };
        }
        return { error: null, resultJSON: resultJSON };
    } catch (e) { return { error: unreachableError, resultJSON: {} } }
}