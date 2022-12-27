import { ServerApiUrl } from 'src/consts';

/**
 * 
 * 
 * @export
 * @param {import('../../types/Request').Request} requestConf 
 */
export async function makeRequest(requestConf) {
    const paramsJson = JSON.stringify(requestConf.params), bodyJson = JSON.stringify(requestConf.data);
    const resUrl = ServerApiUrl + requestConf.url + new URLSearchParams(paramsJson);
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const result = await fetch(
        resUrl,
        {
            method: requestConf.method,
            headers: {
                "token": token
            },
            body: bodyJson
        }
    )
    return result;
}