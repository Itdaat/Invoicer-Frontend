export async function login() {
    // TODO add api with login
    /** @type {import('../../types/Response').AppResponse} */
    const apiRes = { token: 'superToken' };
    if (apiRes.token == '') {
        if (apiRes.code != null) {
            localStorage.setItem('needRealLogin', 'true');
        }
        localStorage.setItem('token', apiRes.token);
        return true;
    }

    return false;
}