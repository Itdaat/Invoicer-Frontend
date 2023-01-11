import { postRequestJson } from "$lib/helpers/apiHelper";
import { getCookie, setCookie } from "$lib/helpers/cookies";

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

/**
 * 
 * 
 * @export
 * @param {string} login 
 * @param {string} password 
 * @returns 
 */
export async function registerUser(login, password) {
    return await postRequestJson('user/register', { login, password });
}

/**
 * 
 * 
 * @export
 */
export function getToken() {
    return getCookie('token');
}

/**
 * 
 * @export
 * @param {string} token 
 * @returns 
 */
export function setToken(token) {
    return setCookie('token', token);
}

export function deleteToken() {
    return setCookie('token', '');
}