// import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const host = event.url.origin;
    const userId = event.cookies.get('token');
    const mobileStartUrl = '/mobile';
    const startUrl = '/invoices';
    const isLoginApi = event.url.pathname.startsWith('/api/reg');
    const isLoginPage = event.url.pathname.startsWith('/login'), isRegisterPage = event.url.pathname.startsWith('/register'), isResetPassPage = event.url.pathname.startsWith('/reset-password');
    const isSetPassword = event.url.pathname.startsWith('/set-password');
    if (!userId && !(isLoginPage || isRegisterPage || isResetPassPage || isLoginApi || isSetPassword)) {
        return Response.redirect(host + '/login');
    }

    // console.log(event.url.pathname);
    if (userId && (isLoginPage || isRegisterPage || isResetPassPage || isLoginApi || event.url.pathname == '/' || isSetPassword)) {
        return Response.redirect(host + '/invoices');
    }

    if (!(isLoginPage || isRegisterPage || isRegisterPage || isLoginApi || isSetPassword)) {
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
        if (isMobile && !event.url.pathname.startsWith(mobileStartUrl)) {
            return Response.redirect(host + mobileStartUrl);
        } else if (!isMobile && event.url.pathname.startsWith(mobileStartUrl)) {
            return Response.redirect(host + startUrl);
        }
    }
    return await resolve(event);
}
