// import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const host = event.url.origin;
    const userId = event.cookies.get('userId');
    const isLoginPage = event.url.pathname.startsWith('/login'), isRegisterPage = event.url.pathname.startsWith('/register'), isResetPassPage = event.url.pathname.startsWith('/reset-password');
    if (!userId && !(isLoginPage || isRegisterPage || isResetPassPage)) {
        return Response.redirect(host + '/login');
    }


    if (!(isLoginPage || isRegisterPage || isRegisterPage)) {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];

        const userAgent = event.request.headers.get('user-agent');
        const isMobile = toMatch.some(toMatchItem => userAgent?.match(toMatchItem));
        if (isMobile && !event.url.pathname.startsWith('/mobile')) {
            // event.request.url.replace(event.url.origin, '')
            return Response.redirect(host + '/mobile');
        } else if (!isMobile && event.url.pathname.startsWith('/mobile')) {
            return Response.redirect(host);
        }
    }
    return await resolve(event);
}