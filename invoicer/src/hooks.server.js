/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const host = event.url.origin;
    const userId = event.cookies.get('userId');
    if (!userId && !(event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register'))) {
        return Response.redirect(host + '/login');
    }


    const response = await resolve(event);
    return response;
}