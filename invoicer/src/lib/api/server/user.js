import { postRequestJson } from "$lib/helpers/apiHelper";

/**
 * 
 * @export
 * @param {string} userLogin 
 * @param {string} userPassword 
 * @returns 
 */
export async function loginUser(userLogin, userPassword) {
    const reqBody = {
        login: userLogin,
        password: userPassword
    };
    const result = await postRequestJson('user/login', reqBody);
    return result;
}

/**
 * 
 * 
 * @export
 * @param {string} userLogin 
 * @returns 
 */
export async function checkUserLogin(userLogin) {
    const result = await postRequestJson('user/check-login', {
        login: userLogin
    })
    return result;
}