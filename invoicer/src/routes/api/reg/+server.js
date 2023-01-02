
/** @type {import('./$types').RequestHandler} */
export function GET(all) {
    const response = new Response('Hello');
    // response.headers['userId'] = 'gavno';
    all.cookies.set('userId', 'gavno', { path: '/', sameSite: true, secure: true });
    return response;
}